require("dotenv").config();

const mongoose = require("mongoose");
const dbConfig = require("../config/db");
const ContactModel = require("../leadx-shared-models/models/contact");
const LeadModel = require("../leadx-shared-models/models/lead");
const ProductServiceModel = require("../leadx-shared-models/models/productService");
const ContactAIGeneratedModel = require("../leadx-shared-models/models/contactAIGenerated");
const CustomFieldModel = require("../leadx-shared-models/models/customField");
const {
  buildCustomFieldsMap,
} = require("../leadx-shared-models/lib/customFieldsMap");

const collections = [
  { model: ContactModel, panel: "contact", name: "contacts" },
  { model: LeadModel, panel: "lead", name: "leads" },
  { model: ProductServiceModel, panel: "productService", name: "productServices" },
  { model: ContactAIGeneratedModel, panel: "contact", name: "contactAIGenerated" },
];

const migrateCollection = async ({ model, panel, name }) => {
  const customFields = await CustomFieldModel.find({ panel }).lean();
  const fieldMap = new Map(customFields.map((field) => [String(field._id), field]));
  const cursor = model
    .find({
      fields: { $exists: true, $ne: [] },
      $or: [
        { customFieldsMap: { $exists: false } },
        { customFieldsMap: null },
        { customFieldsMap: {} },
      ],
    })
    .cursor();

  let migrated = 0;
  let unresolved = 0;

  for await (const doc of cursor) {
    const map = buildCustomFieldsMap(doc.fields || [], fieldMap);
    unresolved += (doc.fields || []).filter(
      (field) => !fieldMap.has(String(field?._id?._id || field?._id)),
    ).length;

    doc.customFieldsMap = map;
    await doc.save();
    migrated += 1;
  }

  console.log(`${name}: migrated ${migrated}, unresolved field refs ${unresolved}`);
};

const main = async () => {
  const connectDB =
    typeof dbConfig === "function" ? dbConfig : dbConfig.connectDB;
  const closeConnections =
    typeof dbConfig.closeConnections === "function"
      ? dbConfig.closeConnections
      : () => mongoose.connection.close();

  await connectDB();

  for (const collection of collections) {
    await migrateCollection(collection);
  }

  await closeConnections();
};

main().catch(async (error) => {
  console.error(error);
  await mongoose.connection.close().catch(() => {});
  process.exit(1);
});

const CompanyModel = require("../../leadx-shared-models/models/company");
const AppModel = require("../../leadx-shared-models/models/app");
const ContactModel = require("../../leadx-shared-models/models/contact");
const ContactCategoryModel = require("../../leadx-shared-models/models/contactCategory");
const EmailHistoryModel = require("../../leadx-shared-models/models/emailHistory");
const FileObjectModel = require("../../leadx-shared-models/models/fileObject");
const path = require("path");
const ImportModel = require("../../leadx-shared-models/models/import");
const LeadModel = require("../../leadx-shared-models/models/lead");
const MemberModel = require("../../leadx-shared-models/models/member");
const RoleModel = require("../../leadx-shared-models/models/role");
const S3BucketModel = require("../../leadx-shared-models/apps/s3-bucket/models/bucket");
const SMTPModel = require("../../leadx-shared-models/apps/smtp/models/smtp");
const TagModel = require("../../leadx-shared-models/models/tag");
const SettingModel = require("../../leadx-shared-models/models/setting");
const CustomFieldModel = require("../../leadx-shared-models/models/customField");
const {
  sendResponse,
  applyQueryOptions,
  createError,
} = require("../../leadx-shared-models/utils/utils");
const DashboardModel = require("../../leadx-shared-models/models/dashboard");
const SegmentModel = require("../../leadx-shared-models/models/segment");
const ProductServiceModel = require("../../leadx-shared-models/models/productService");
const Smtp = require("../../leadx-shared-models/apps/smtp/models/smtp");
const Bucket = require("../../leadx-shared-models/apps/s3-bucket/models/bucket");
const MetaApp = require("../../leadx-shared-models/apps/whatsapp-business/models/app");
const FacebookApp = require("../../leadx-shared-models/apps/facebook/models/app");
const Gemini = require("../../leadx-shared-models/apps/gemini/models/gemini");
const TelegramApp = require("../../leadx-shared-models/apps/telegram/models/telegramApp");
const InstagramApp = require("../../leadx-shared-models/apps/instagram/models/instagramApp");
const UnifiedMessage = require("../../leadx-shared-models/models/UnifiedMessage");
const ocr = require("../../leadx-shared-models/apps/legacy-vision-api/models/ocr");
const MetaTemplate = require("../../leadx-shared-models/apps/whatsapp-business/models/template");
const EmailTemplateModel = require("../../leadx-shared-models/models/emailTemplate");
const CampaignModel = require("../../leadx-shared-models/models/campaign");
const SmtpMessage = require("../../leadx-shared-models/apps/smtp/models/message");
const WhatsAppMessage = require("../../leadx-shared-models/apps/whatsapp-business/models/message");
const GmailMessage = require("../../leadx-shared-models/apps/gmail/models/message");
const InviteLogModel = require("../../leadx-shared-models/models/inviteLog");
const APIModel = require("../../leadx-shared-models/models/api");
const Payment = require("../../leadx-shared-models/models/payment");
const Subscription = require("../../leadx-shared-models/models/subscription");
const { default: mongoose } = require("mongoose");
const serverLog = require("../../leadx-shared-models/models/serverLog");
const { AiLogModel } = require("../../leadx-shared-models/models/aiLog");
const AnalyticsDashboardModel = require("../../leadx-shared-models/models/analyticsDashboard");
const AnalyticsWidgetModel = require("../../leadx-shared-models/models/analyticsWidget");
const CallLogModel = require("../../leadx-shared-models/models/callLog");
const CampaignLogModel = require("../../leadx-shared-models/models/campaignLog");
const ContactAIGeneratedModel = require("../../leadx-shared-models/models/contactAIGenerated");
const CouponModel = require("../../leadx-shared-models/models/coupon");
const CustomSectionModel = require("../../leadx-shared-models/models/customSection");
const GlobalAILead = require("../../leadx-shared-models/models/globalAILead");
const TempManualCampaignModel = require("../../leadx-shared-models/models/tempManualCampaign");
const facebookLog = require("../../leadx-shared-models/apps/facebook/models/facebookLog");
const FormModel = require("../../leadx-shared-models/apps/facebook/models/forms");
const FacebookLead = require("../../leadx-shared-models/apps/facebook/models/Lead");
const PageModel = require("../../leadx-shared-models/apps/facebook/models/pages");
const syncJob = require("../../leadx-shared-models/apps/facebook/models/syncJob");
const InstagramAccount = require("../../leadx-shared-models/apps/instagram/models/InstagramAccount");
const InstagramComment = require("../../leadx-shared-models/apps/instagram/models/instagramComment");
const InstagramMessage = require("../../leadx-shared-models/apps/instagram/models/instagramMessage");
const manualPayment = require("../../leadx-shared-models/apps/manual-payment/models/manualPayment");
const ManualPaymentRequest = require("../../leadx-shared-models/apps/manual-payment/models/ManualPaymentRequest");
const openai = require("../../leadx-shared-models/apps/openai/models/openai");
const Paypal = require("../../leadx-shared-models/apps/paypal/models/paypal");
const Transaction = require("../../leadx-shared-models/apps/paypal/models/transaction");
const Payu = require("../../leadx-shared-models/apps/payu/models/payu");
const PayuTransaction = require("../../leadx-shared-models/apps/payu/models/transaction");
const People = require("../../leadx-shared-models/apps/people/models/people");
const Phonepe = require("../../leadx-shared-models/apps/phonepe/models/phonepe");
const phonePeTransaction = require("../../leadx-shared-models/apps/phonepe/models/transaction");
const Razorpay = require("../../leadx-shared-models/apps/razerpay/models/razorpay");
const razorpayTransaction = require("../../leadx-shared-models/apps/razerpay/models/transaction");
const Stripe = require("../../leadx-shared-models/apps/stripe/models/stripe");
const StripeTransaction = require("../../leadx-shared-models/apps/stripe/models/transaction");
const TelegramMessage = require("../../leadx-shared-models/apps/telegram/models/telegramMessage");
const {
  deleteBucketObject,
} = require("../../leadx-shared-models/apps/s3-bucket");
const Team = require("../../leadx-shared-models/models/team");
const getCompanies = async (req, res, next) => {
  try {
    const docs = await applyQueryOptions({
      data: CompanyModel,
      query: req.query,
      populate: [
        ["updatedBy", "Member", "members"],
        ["createdBy", "Member", "members"],
      ],
      aggregationPipeline: [
        {
          $lookup: {
            from: "members",
            let: { companyId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$company", "$$companyId"] },
                      { $eq: ["$status", "owner"] },
                    ],
                  },
                },
              },
            ],
            as: "member",
          },
        },
        {
          $unwind: {
            path: "$member",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "member.email",
            foreignField: "email",
            as: "admin",
          },
        },
        {
          $unwind: {
            path: "$admin",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "settings",
            localField: "_id",
            foreignField: "company",
            as: "setting",
          },
        },
        {
          $unwind: {
            path: "$setting",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "files",
            localField: "setting.assets.logo",
            foreignField: "_id",
            as: "setting.assets.logo",
          },
        },
        {
          $unwind: {
            path: "$setting.assets.logo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "subscriptions",
            let: { companyId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$company", "$$companyId"] },
                      { $eq: ["$status", "active"] },
                    ],
                  },
                },
              },
            ],
            as: "subscription",
          },
        },

        {
          $unwind: {
            path: "$subscription",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            name: 1,
            email: 1,
            contactNumber: 1,
            memberCount: 1,
            setting: 1,
            admin: 1,
            subscription: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ],
    });

    await sendResponse(res, null, null, docs);
  } catch (error) {
    next(error);
  }
};

const deleteCompanies = async (req, res, next) => {
  try {
    const { admin } = req;
    const { ids } = req.body;
    const id = ids[0];
    const { password } = req.query;
    // console.log("admin is", admin);

    if (
      !admin.isSuperAdmin ||
      !id?.trim() ||
      !password ||
      password !== process.env.DELETE_COMPANY_PASS
    )
      return await createError({ key: "066" });

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const companyFiles = await FileObjectModel.find({ company: id })
        .select("_id name bucket")
        .lean();

      await Promise.all(
        companyFiles
          .filter((file) => file.bucket)
          .map((file) =>
            deleteBucketObject(
              file.bucket,
              `${file._id.toString()}${path.extname(file.name)}`,
            ),
          ),
      );

      const deletedCompanies = await CompanyModel.deleteOne(
        { _id: id },
        { session },
      );

      await Promise.all([
        AiLogModel.deleteMany({ company: id }, { session }),
        AnalyticsDashboardModel.deleteMany({ company: id }, { session }),
        AnalyticsWidgetModel.deleteMany({ company: id }, { session }),
        CallLogModel.deleteMany({ company: id }, { session }),
        CampaignLogModel.deleteMany({ company: id }, { session }),

        DashboardModel.deleteMany({ company: id }, { session }),
        ContactModel.deleteMany({ company: id }, { session }),
        ContactAIGeneratedModel.deleteMany({ company: id }, { session }),
        CouponModel.deleteMany({ company: id }, { session }),
        CustomSectionModel.deleteMany({ company: id }, { session }),
        GlobalAILead.deleteMany({ companyId: id }, { session }),

        ImportModel.deleteMany({ company: id }, { session }),
        Team.deleteMany({ company: id }, { session }),
        TagModel.deleteMany({ company: id }, { session }),
        ContactCategoryModel.deleteMany({ company: id }, { session }),
        SegmentModel.deleteMany({ company: id }, { session }),
        LeadModel.deleteMany({ company: id }, { session }),
        ProductServiceModel.deleteMany({ company: id }, { session }),
        TempManualCampaignModel.deleteMany({ company: id }, { session }),
        FileObjectModel.deleteMany({ company: id }, { session }),
        Bucket.deleteMany({ companyID: id }, { session }),

        // Apps
        AppModel.deleteMany({ company: id }, { session }),
        Smtp.deleteMany({ companyID: id }, { session }),
        MetaApp.deleteMany({ companyID: id }, { session }),
        FacebookApp.deleteMany({ companyID: id }, { session }),
        facebookLog.deleteMany({ companyID: id }, { session }),
        FormModel.deleteMany({ companyID: id }, { session }),
        FacebookLead.deleteMany({ companyID: id }, { session }),
        PageModel.deleteMany({ companyID: id }, { session }),
        syncJob.deleteMany({ companyID: id }, { session }),

        ocr.deleteMany({ companyID: id }, { session }),
        Gemini.deleteMany({ companyID: id }, { session }),
        TelegramApp.deleteMany({ companyID: id }, { session }),
        InstagramApp.deleteMany({ companyID: id }, { session }),
        InstagramAccount.deleteMany({ companyID: id }, { session }),
        InstagramComment.deleteMany({ companyID: id }, { session }),
        InstagramMessage.deleteMany({ companyID: id }, { session }),

        // Messages & templates
        UnifiedMessage.deleteMany({ companyID: id }, { session }),
        MetaTemplate.deleteMany({ companyID: id }, { session }),
        EmailTemplateModel.deleteMany({ companyID: id }, { session }),
        CampaignModel.deleteMany({ companyID: id }, { session }),

        // Settings & users
        SettingModel.deleteMany({ company: id }, { session }),
        RoleModel.deleteMany({ company: id }, { session }),
        MemberModel.deleteMany({ company: id }, { session }),
        CustomFieldModel.deleteMany({ company: id }, { session }),

        // Logs
        EmailHistoryModel.deleteMany({ company: id }, { session }),
        SmtpMessage.deleteMany({ companyID: id }, { session }),
        WhatsAppMessage.deleteMany({ companyID: id }, { session }),
        GmailMessage.deleteMany({ companyID: id }, { session }),
        InviteLogModel.deleteMany({ company: id }, { session }),
        // Billing
        APIModel.deleteMany({ company: id }, { session }),
        Payment.deleteMany({ company: id }, { session }),
        Subscription.deleteMany({ company: id }, { session }),
        manualPayment.deleteMany({ companyID: id }, { session }),
        ManualPaymentRequest.deleteMany({ companyID: id }, { session }),

        // apps
        openai.deleteMany({ companyID: id }, { session }),
        Paypal.deleteMany({ companyID: id }, { session }),
        Transaction.deleteMany({ companyID: id }, { session }),
        Payu.deleteMany({ companyID: id }, { session }),
        PayuTransaction.deleteMany({ companyID: id }, { session }),
        People.deleteMany({ companyID: id }, { session }),
        Phonepe.deleteMany({ companyID: id }, { session }),
        phonePeTransaction.deleteMany({ companyID: id }, { session }),
        Razorpay.deleteMany({ companyID: id }, { session }),
        razorpayTransaction.deleteMany({ companyID: id }, { session }),
        Stripe.deleteMany({ companyID: id }, { session }),
        StripeTransaction.deleteMany({ companyID: id }, { session }),
        TelegramMessage.deleteMany({ companyID: id }, { session }),
      ]);
      const deletedServerLogs = await serverLog.deleteMany(
        { company: id },
        { session },
      );
      await session.commitTransaction();
      session.endSession();
      sendResponse(res, deletedCompanies, { key: "050" });
    } catch (error) {
      if (session.inTransaction()) await session.abortTransaction();
      session.endSession();
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getCompanies, deleteCompanies };

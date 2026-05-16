// 1. Add 'async' here
const errorhandler = async (err, req, res, next) => {
  console.log("the error is", err);
  let { status = 500, message = "Something went wrong" } = err;
  let statusCode = err.status || err.st || 500;

  if (err.name === "JsonWebTokenError") {
    message = "Invalid token. Please log in again";
    status = 401;
  } else if (err.name === "TokenExpiredError") {
    message = "Token expired. Please log in again";
    status = 401;
  }


  if (req.log) {
    req.log.level = "error";
    req.log.statusCode = status || 500;
    req.log.stack = err.stack; // Optional: saves the error trace
    req.log.adminUser = req.admin?._id || req.log.adminUser; // Ensure admin is linked
    await req.log.save(); // Save the failure to MongoDB
  }

  res.status(status).json({
    ok: false,
    success: false,
    message,
  });
};

module.exports = { errorhandler };

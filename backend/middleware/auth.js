const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // const { token } = req.cookies;

  // if (!token) {
  //     return next(new ErrorHander("Please Login to access this resource", 401));
  // }
  // const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  // req.user = await User.findById(decodedData.id);

  // next();
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dvclu2532000");

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req);
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowe access this resource`,
          403
        )
      );
    }
    next();
  };
};
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role) {
    next();
  } else {
    res.status(401).json({ message: "Invalid Admin Token" });
  }
};

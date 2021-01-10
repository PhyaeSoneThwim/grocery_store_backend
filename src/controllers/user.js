const _ = require("lodash");
const catchAsync = require("express-async-handler");
const AppError = require("../utils/appError");
const unLink = require("../utils/unLink");
const User = require("../models/user");

/**
 * @desc   -> method for user registration
 * @route  -> POST /api/auth/signup
 * @access -> Public
 * @status -> Finished
 */
exports.signup = catchAsync(async (req, res, next) => {
  const existUser = await User.findOne({ email: req.body.email });
  if (existUser) {
    return next(new AppError("Email already exists", 400));
  }
  const user = await User.create(req.body);
  const token = user.generateToken(user._id);
  res.status(201).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
});

/**
 * @desc   -> method to authenticate user
 * @route  -> POST /api/auth/login
 * @access -> Public
 * @status -> Finished
 */
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("Wrong email or password", 400));
  }
  const token = user.generateToken(user._id);
  res.status(200).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
});

/**
 * @desc   -> method to add new user
 * @route  -> POST /api/users
 * @access -> Private
 * @allow  -> [super-admin]
 * @status -> Finished
 */
exports.addUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

/**
 * @desc   -> method to get user by _id
 * @route  -> GET /api/users/:id
 * @access -> Private
 * @allow  -> [super-admin]
 * @status -> Finished
 */
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("No user found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

/**
 * @desc   -> method to get all user
 * @route  -> GET /api/users
 * @access -> Private
 * @allow  -> [super-admin]
 * @status -> Finished
 */
exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: "admin" });
  if (!users.length > 0) {
    return next(new AppError("No users found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

/**
 * @desc   -> method to update user by _id
 * @route  -> PUT /api/users/:id
 * @access -> Private
 * @allow  -> [super-admin]
 * @status -> Finished
 */
exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("No user found", 404));
  }
  if (user.profile && req.body.profile) {
    unLink(`public/img/profiles/${user.profile}`);
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

/**
 * @desc   -> method to delete user by _id
 * @route  -> DELETE /api/users/:id
 * @access -> Private
 * @allow  -> [super-admin]
 * @status -> Finished
 */
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("No user found", 404));
  }
  await user.remove();
  res.status(200).json({
    status: "success",
  });
});

/**
 * @desc   -> update current login user info
 * @route  -> GET /api/auth/me
 * @access -> Private
 * @status -> Finished
 */
exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

/**
 * @desc   -> update current login user password
 * @route  -> PUT /api/auth/update-password
 * @access -> Private
 * @status -> Finished
 */
exports.updateMe = catchAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password || confirmPassword) {
    return next(new AppError("Route is not defined to update password", 400));
  }
  const user = await User.findById(req.user._id);

  // delete current profile if current and incoming profile exist
  if (user.profile && req.body.profile) {
    unLink(`public/img/profiles/${user.profile}`);
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    _.pick(req.body, ["name", "profile"]),
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

/**
 * @desc   -> method to update current password
 * @route  -> PUT /api/auth/update-password
 * @access -> Private
 * @status -> Finished
 */
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  // check whether retype password is correct
  if (!(await user.comparePassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  res.status(200).json({
    status: "success",
  });
});

const jwt = require("jsonwebtoken");
const catchAsync = require("express-async-handler");
const User = require("../models/user");
const AppError = require("../utils/appError");
module.exports = catchAsync(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ");
	}
	if (!token) {
		return next(new AppError("Please login and try again"), 401);
	}
	const decoded = jwt.verify(token, process.env.SECRET_KEY);
	const user = await User.findById(decoded._id);
	if (!user) {
		return next(
			new AppError("User belonging to the token doesn't exist", 402),
		);
	}
	req.user = user;
	next();
});

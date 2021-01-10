const AppError = require("../utils/appError");
module.exports = (...roles) => {
  return (req, res, next) => {
    // user authorization with roles ["admin","super-admin","user"]
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permissions to perform this action", 403)
      );
    }
    next();
  };
};

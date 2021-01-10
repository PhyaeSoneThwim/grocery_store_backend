module.exports = (app) => {
  // @desc -> handling all non-exist routes
  app.all("*", (req, res, next) => {
    return next(new AppError("No route defined", 404));
  });

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";
    return res.status(statusCode).json({
      status: status,
      message: err.message,
    });
  });
};

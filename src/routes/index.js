const userRoute = require("./user");
const authRoute = require("./auth");
const productRoute = require("./product");
const categoryRoute = require("./category");
module.exports = (app) => {
  app.use("/api/categories", categoryRoute);
  app.use("/api/products", productRoute);
  app.use("/api/users", userRoute);
  app.use("/api/auth", authRoute);
};

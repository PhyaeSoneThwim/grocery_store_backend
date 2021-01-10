const productRoute = require("./product");
const userRoute = require("./user");
const authRoute = require("./auth");
module.exports = (app) => {
  app.use("/api/products", productRoute);
  app.use("/api/users", userRoute);
  app.use("/api/auth", authRoute);
};

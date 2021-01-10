const productRoute = require("./product");

module.exports = (app) => {
	app.use("/api/products", productRoute);
};

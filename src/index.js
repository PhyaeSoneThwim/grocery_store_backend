require("dotenv").config();
const express = require("express");

// @desc -> initialized express app
const app = express();

// @desc -> setup express middlewares
require("./middlewares/app")(app);

// @desc -> setup routes
require("./routes")(app);

// @desc -> connect to mongodb
require("./database/dbConnect")();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`server is running at localhost:${PORT}`.cyan.bold);
});

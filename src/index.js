require("dotenv").config();
const colors = require("colors");
const morgan = require("morgan");
const express = require("express");
const dbConnect = require("./database/dbConnect");

const app = express();

// @desc -> json parsing middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
	// @desc -> logging request & response
	app.use(morgan("dev"));
}

// @desc -> connect to mongodb
dbConnect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`server is running at localhost:${PORT}`.cyan.bold);
});

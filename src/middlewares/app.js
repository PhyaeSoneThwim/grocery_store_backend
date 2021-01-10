const path = require("path");
const express = require("express");
const morgan = require("morgan");
const AppError = require("../utils/appError");
module.exports = (app) => {
	// @desc -> json parsing middleware
	app.use(express.json());
	// @desc -> setup static directory
	app.use(express.static(path.resolve(__dirname, "../public")));

	if (process.env.NODE_ENV === "development") {
		// @desc -> logging request & response
		app.use(morgan("dev"));
	}
};

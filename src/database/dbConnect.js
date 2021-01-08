const mongoose = require("mongoose");
const colors = require("colors");

module.exports = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
			useNewUrlParser: true,
		});
		console.log("connected to database".green.inverse);
	} catch (error) {
		console.log(error.message.red.bold);
		process.exit(1);
	}
};

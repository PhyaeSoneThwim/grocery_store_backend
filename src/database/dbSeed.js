require("dotenv").config();
const colors = require("colors");
const User = require("../models/user");
const users = require("../data/users");
const dbConnect = require("./dbConnect");
const categories = require("../data/categories");
const Category = require("../models/category");
// const products = require("../data/products");
// const Product = require("../models/product");

dbConnect();

/**
 * @method -> import data
 * @desc -> seed data into database
 */
const importData = async () => {
  try {
    await User.deleteMany();
    await Category.deleteMany();
    //await Product.deleteMany();

    // @desc -> first insert user data
    //const userLists = await User.create(users);

    // @desc -> get admin user
    //const admin = userLists.find((user) => user.role === "admin");

    // @desc -> attach admin user._id into product
    // const productLists = products.map((product) => {
    // 	return { ...product, user: admin._id };
    // });

    // @desc -> insert product lists
    await User.create(users);
    await Category.create(categories);
    console.log("Inserted raw data into database".cyan.bold);
    process.exit();
  } catch (error) {
    console.log(error.message.red.inverse);
    process.exit(1);
  }
};

/**
 * @method -> deleteData
 * @desc -> seed:undo:all data from database
 */
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Category.deleteMany();
    // await Product.deleteMany();
    console.log("Deleted raw data from database".cyan.bold);
    process.exit();
  } catch (error) {
    console.log(error.message.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}

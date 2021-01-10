const validator = require("validator");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const unLink = require("../utils/unLink");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Email is not correct"],
  },
  role: {
    type: String,
    enum: {
      values: ["user", "admin", "super-admin"],
      message: "User role is either: user, admin, super-admin",
    },
    required: [true, "Role is required"],
    default: "user",
  },
  profile: String,
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Minimum 6 characters required"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password is required"],
    validate: {
      validator: function (confirmPassword) {
        return this.password === confirmPassword;
      },
      message: "Passwords are not the same",
    },
  },
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function (id) {
  return jwt.sign({ _id: id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = undefined;
  next();
});
userSchema.pre("remove", function (next) {
  if (this.profile) {
    unLink(`public/img/profiles/${this.profile}`);
    next();
  }
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;

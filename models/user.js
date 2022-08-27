const mongoose = require("mongoose");
const regexCode = require("../core/regex");

const userSchema = mongoose.Schema({
  name: {
    required: [true, 'User name is required'],
    type: String,
    trim: true,
  },
  email: {
    required: [true, 'User Email is required'],
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        return value.match(regexCode.regexEmail);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    validator: (value) => {
      return value.match(regexCode.password);
    },
    message: "Please enter Valid Password",
    required: [true, 'Password is required with Minimum eight characters, at least one letter, one number and one special character'],
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  isAdmin:{
    type:Boolean,
    default : false
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;

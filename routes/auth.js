const express = require("express");
const authRouter = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const strings = require("../core/strings");
const regexCode = require("../core/regex");

// Sign Up
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name && email && password) {
      if (password.match(regexCode.regexPass)) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res
            .status(400)
            .json({ error: "User with same email already exists!" });
        }
        const hashedPassword = await bcryptjs.hash(password, 8);
        let user = new User({
          email,
          password: hashedPassword,
          name,
        });
        user = await user.save();
        userTemp = user._doc;
        userTemp['password'] = "hidden"
        const token = jwt.sign({ id: user._id }, strings.secretKey);
        res.status(200).json({ data: { ...userTemp }, token: token });
      } else {
        res.status(500).json({ error: "Minimum eight characters, at least one letter, one number and one special character" });
      }

    } else {
      res.status(400).json({ error: "Please enter required data..." });

    }


  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Sign In
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password." });
    }

    const token = jwt.sign({ id: user._id }, strings.secretKey);
    userTemp = user._doc;
    userTemp['password'] = "hidden"
    res.json({ token, ...userTemp });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// token Is Valid
authRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, strings.secretKey);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get user data
authRouter.get("/profile/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (user._id == req.params.id) {
      user.password = "hidden"
      res.json({ ...user._doc, token: req.token });
    } else {
      res.status(500).json({ error: "Not allowed" })
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

module.exports = authRouter;

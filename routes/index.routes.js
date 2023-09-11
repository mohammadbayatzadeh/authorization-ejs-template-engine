const { Router } = require("express");
const { connectDB } = require("../utils/connectDB");
const { hashPassword, checkEmail } = require("../utils/auth");
const { User } = require("../models/user.model");
const router = Router();

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login Page",
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register Page",
  });
});

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
  });
});

router.post("/register", async (req, res, next) => {
  const referrer = req.header("Refferer") || req.headers.referer;
  const {
    firstname: firstName,
    lastname: lastName,
    email,
    password,
  } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      req.flash("error", "please enter full data");
      return res.redirect(referrer ?? "/register");
    }
    const emailresult = checkEmail(email);
    if (!emailresult) {
      req.flash("error", email + "  is not vald");
      return res.redirect(referrer ?? "/register");
    }
    
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", email + "  is already resgistered");
      return res.redirect(referrer ?? "/register");
    }

    const hashedPassword = hashPassword(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  allRouters: router,
};

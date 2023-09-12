const { connectDB } = require("../utils/connectDB");
const { hashPassword, checkEmail } = require("../utils/auth");
const { User } = require("../models/user.model");

const registerController = async (req, res, next) => {
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
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    req.flash("error", " resgistered");
    return res.redirect("/login");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerController,
};

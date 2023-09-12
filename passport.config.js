const { Strategy: LocalStategy } = require("passport-local");
const { connectDB } = require("./utils/connectDB");
const { User } = require("./models/user.model");
const { comparePassword } = require("./utils/auth");

const passportInit = async (passport) => {
  const authenticatedUser = async (email, password, done) => {
    try {
      await connectDB();
      const user = await User.findOne({ email });
      if (!user) done(null, false, { messa: "user not found!" });

      const verifyPass = comparePassword(password, user.password);
      if (!verifyPass)
        done(null, false, { messa: "email or password is incorect!" });
      done(null, user);
    } catch (error) {
      done(error);
    }
  };
  const localStategy = new LocalStategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    authenticatedUser
  );

  const serializeUser = passport.serializeUser((user, done) => {
    return done(null, user._id);
  });
  const deserializeUser = passport.deserializeUser(async (id, done) => {
    await connectDB();
    const user = await User.findById(id);
    if (!user) done(null, false, { messa: "user not found!" });

    return done(null, user);
  });

  passport.use("local", localStategy, serializeUser, deserializeUser);
};

module.exports = {
  passportInit,
};

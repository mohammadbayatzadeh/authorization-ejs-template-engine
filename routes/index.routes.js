const { Router } = require("express");
const { registerController } = require("../controllers/auth.contollers");
const {
  checkIfIsAuth,
  checkAuthenticated,
} = require("../middlewares/auth.middleware");

const router = Router();

function initRoutes(passport) {
  router.get("/login", checkIfIsAuth, (req, res) => {
    res.render("login", {
      title: "Login Page",
    });
  });

  router.get("/register", checkIfIsAuth, (req, res) => {
    res.render("register", {
      title: "Register Page",
    });
  });

  router.get("/profile", checkAuthenticated, (req, res) => {
    const user = req.user;
    res.render("profile", {
      title: "profile Page",
      user,
    });
  });

  router.get("/", (req, res) => {
    res.render("index", {
      title: "Home Page",
    });
  });

  router.get("/logout", (req, res) => {
    req.logOut({ keepSessionInfo: false }, (err) => {
      if (err) console.log(err);
    });
    res.redirect("/");
  });

  router.post("/register", checkIfIsAuth, registerController);

  router.post(
    "/login",
    checkIfIsAuth,
    passport.authenticate("local", {
      successRedirect: "/profile",
      failureRedirect: "/login",
      successFlash: true,
    }),
    (req, res, next) => {
      res.redirect("/profile");
    }
  );
  return router;
}

module.exports = initRoutes;

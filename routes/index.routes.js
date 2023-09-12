const { Router } = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/auth.contollers");
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
    res.render("profile", {
      title: "profile Page",
    });
  });

  router.get("/", (req, res) => {
    res.render("index", {
      title: "Home Page",
    });
  });

  router.post("/register", checkIfIsAuth, registerController);
  router.post(
    "/login",
    checkIfIsAuth,
    passport.authenticate({
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

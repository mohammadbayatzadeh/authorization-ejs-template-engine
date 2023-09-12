const { Router } = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/auth.contollers");

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

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = {
  allRouters: router,
};

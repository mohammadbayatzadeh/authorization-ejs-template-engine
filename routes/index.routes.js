const { Router } = require("express");
const router = Router();

router.get("/login", (req, res) => {
  res.render("layout/main", {
    title:"login",
    body:'/login'
  });
});

router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/", (req, res) => {
  res.render("index");
});
module.exports = {
  allRouters: router,
};

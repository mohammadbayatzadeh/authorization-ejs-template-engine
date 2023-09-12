const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect("/login");
};

const checkIfIsAuth = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/profile");
  return next();
};

module.exports = {
  checkAuthenticated,
  checkIfIsAuth,
};

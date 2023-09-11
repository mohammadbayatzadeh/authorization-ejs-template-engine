const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const checkEmail = (email) => {
  const result = email.match(
    /^[a-z+][a-z0-9\.\-]{4,15}@[a-z]{3,10}\.[a-z]{3,10}/gim
  );
  if (result) {
    return true;
  }
  throw { status: 400, message: "email invalid" };
};

const hashPassword = (password) => {
  const salt = genSaltSync(12);
  return hashSync(password, salt);
};

const comparePassword = (pass, hashed) => {
  return compareSync(pass, hashed);
};

module.exports = {
  checkEmail,
  hashPassword,
  comparePassword,
};

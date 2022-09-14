const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const listCurrent = require("./listCurrent");
const updateAvatar = require("./updateAvatar");
const emailVerify = require("./emailVerify");
const resendEmail = require("./resendEmail");

module.exports = {
  register,
  login,
  logout,
  listCurrent,
  updateAvatar,
  resendEmail,
  emailVerify,
};

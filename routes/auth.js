const { StatusCodes } = require("http-status-codes");
const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const { authenticateUser } = require("../middlewares/authentication");
const router = require("express")();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(authenticateUser, logout);
router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
module.exports = router;

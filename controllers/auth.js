const {
  StatusCodes,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../errors");
const { User, Token } = require("../models");
const { createTokenUser } = require("../utils/createTokenUser");
const crypto = require("crypto");
const { attachCookieResponse, removeCookieResponse } = require("../utils/jwt");
const { sendVerificationEmail, sendForgotPassword } = require("../utils/mail");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    throw new BadRequestError("Please provide all values");
  const isEmail = await User.findOne({ where: { email } });
  if (isEmail) throw new BadRequestError("Email is exsting");
  req.body.verificationToken = crypto.randomBytes(40).toString("hex");
  const newUser = await User.create({ ...req.body });
  sendVerificationEmail({
    origin: "http://localhost:4000",
    email,
    name,
    verificationToken: newUser.verificationToken,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Register successfull , please verify your email" });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Please provide all values");
  const user = await User.findOne({ where: { email } });
  if (!user) throw new UnauthorizedError("Email is not valid");
  const isMatch = await user.comparePWD(password);
  if (!isMatch) throw new UnauthorizedError("Password is not valid");
  const tokenUser = createTokenUser(user);
  let refreshToken = "";
  const token = await Token.findOne({ where: { userId: tokenUser.id } });
  if (token) {
    const { isValid } = token;
    if (!isValid) throw new UnauthorizedError("Token is not valid");
    refreshToken = token.refreshToken;
    attachCookieResponse({ res, tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { userId: tokenUser.id, userAgent, ip, refreshToken };
  await Token.create(userToken);
  attachCookieResponse({ res, tokenUser, refreshToken });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
  await Token.destroy({ where: { userId: req.userInfo.id } });
  removeCookieResponse({ res });
  res.status(StatusCodes.OK).json({ message: "User logged out" });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  if (!email || !verificationToken)
    throw new UnauthorizedError("Verification failed");
  const user = await User.findOne({ where: { email, verificationToken } });
  if (!user) throw new UnauthorizedError("Verification failed");
  user.verifiedDate = new Date();
  user.isVerified = true;
  user.verificationToken = "";
  await user.save();
  res.status(StatusCodes.OK).json({ message: "Verified successfully" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) throw new BadRequestError("Please provide a valid email");
  const user = await User.findOne({ where: { email } });
  if (!user) throw new NotFoundError("Email is not existing");
  user.passwordToken = crypto.randomBytes(40).toString("hex");
  const tenMinutes = 60 * 1000 * 10;
  user.passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

  await user.save();
  console.log(user.passwordTokenExpirationDate);
  sendForgotPassword({
    origin: "http://localhost:4000",
    name: user.name,
    email: user.email,
    passwordToken: user.passwordToken,
  });
  res
    .status(StatusCodes.OK)
    .json({ message: "Please check your email to reset your password" });
};

const resetPassword = async (req, res) => {
  const { newPassword, email, passwordToken } = req.body;
  if (!(email && passwordToken && newPassword))
    throw new UnauthorizedError("Reset password failed");
  const user = await User.findOne({ where: { email, passwordToken } });
  if (!user) throw new UnauthorizedError("Reset password failed 1");
  const currentDate = new Date();
  console.log(currentDate);
  console.log(user.passwordTokenExpirationDate);
  if (!(user.passwordTokenExpirationDate > currentDate)) {
    throw new UnauthorizedError("Token of password is expired");
  }
  user.password = newPassword;
  user.passwordToken = null;
  user.passwordTokenExpirationDate = currentDate;
  await user.save();
  res.status(StatusCodes.OK).json({ message: "Reset password sucessfully" });
};
module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};

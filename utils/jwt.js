const jwt = require("jsonwebtoken");
const jwt_key = process.env.JWT_KEY;
const createToken = (payload) => {
  const tokenJWT = jwt.sign(
    { exp: Math.floor(Date.now() / 1000) + 60 * 60, data: { ...payload } },
    jwt_key
  );
  return tokenJWT;
};
const isTokenValid =  (token) => jwt.verify(token, jwt_key);
const attachCookieResponse = async ({ res, tokenUser, refreshToken }) => {
  const tokenJWT = createToken({ ...tokenUser });
  const oneDay = 1000 * 60 * 60 * 24;
  const oneMonth = oneDay * 30;
  res.cookie("accessToken", tokenJWT, {
    oneDay,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
  res.cookie("refreshToken", refreshToken, {
    oneDay,
    expires: new Date(Date.now() + oneMonth),
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
};

const removeCookieResponse = ({ res }) => {
  res.clearCookie("accessToken", "logout", {
    expires: new Date(Date.now() + 1000),
  });
  res.clearCookie("refreshToken", "logout", {
    expires: new Date(Date.now() + 1000),
  });
};
module.exports = {
  attachCookieResponse,
  removeCookieResponse,
  isTokenValid
};

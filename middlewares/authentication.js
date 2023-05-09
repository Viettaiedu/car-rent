const { UnauthorizedError } = require("../errors");
const { isTokenValid } = require("../utils/jwt");
const authenticateUser = (req, res, next) => {
  const token = req.cookies?.accessToken;
  console.log(token)
  if (!token) throw new UnauthorizedError("Token is not valid");
  try {
    const {data} = isTokenValid(token);
    req.userInfo = data;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  authenticateUser,
};

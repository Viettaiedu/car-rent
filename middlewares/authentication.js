const { UnauthorizedError } = require("../errors");
const authozirePermission = async (req, res, next) => {
  if (!req.user) throw new UnauthorizedError("Unauthorized");
  next();
};

module.exports = {
  authozirePermission,
};

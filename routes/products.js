const { StatusCodes } = require("http-status-codes");
const passport = require("passport");
const router = require("express")();
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/redirect",
  passport.authenticate("google"),
  async (req, res) => {
    res.json({ user: req.user });
  }
);
router.get("/logout", async (req, res) => {
  req.logout();
  res.status(StatusCodes.OK).json({ message: "user logged out" });
});

module.exports = router;

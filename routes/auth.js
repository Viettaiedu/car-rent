const { StatusCodes } = require("http-status-codes");

const router = require("express")();

module.exports = router;

// Login google
// const passport = require("passport");
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );
// router.get(
//   "/google/redirect",
//   passport.authenticate("google"),
//   async (req, res) => {
//     res.json({ user: req.user });
//   }
// );
// router.get("/logout", async (req, res) => {
//   req.logout();
//   res.status(StatusCodes.OK).json({ message: "user logged out" });
// });

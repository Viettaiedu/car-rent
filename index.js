require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cookieSession = require("cookie-session");
const app = express();

// Routes
const routeAuth = require("./routes/auth");
const routeProducts = require("./routes/products");
const passport = require("passport");
const { errorHandler, notFoundHandler } = require("./middlewares");
require("./config/passport-google");
// const routeProduct= require("./routes/routeProduct");
app.set("view engine", "ejs");
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 60 * 1000 * 60 * 24, // 1day
    keys: ["123312"],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", routeAuth);
app.use("/api/v1/products", routeProducts);
app.get("/login", (req, res) => {
  res.render("Login");
});
app.get("/logout", (req, res) => {
  res.render("Logout");
});

app.use(notFoundHandler);
app.use(errorHandler);
// connect server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server listenning on port " + port));

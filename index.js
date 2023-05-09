require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const app = express();
// Routes
const routeAuth = require("./routes/auth");
const routeProducts = require("./routes/products");
const routeCart = require("./routes/cart");

// middleware errors
const { errorHandler, notFoundHandler } = require("./middlewares");

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
// security package
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(xss());
app.use(helmet());
app.use(mongoSanitize());
if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}

app.use(
  rateLimiter({
    windowMs: 1000 * 60 * 10,
    max: 100,
  })
);

// routes
app.use("/api/v1/auth", routeAuth);
app.use("/api/v1/products", routeProducts);
app.use("/api/v1/cart", routeCart);
app.get("/login", (req, res) => {
  res.render("Login");
});
app.get("/logout", (req, res) => {
  res.render("Logout");
});
app.get("/verify-email", (req, res) => {
  res.render("VerifyEmail");
});
app.get("/forgot-password", (req, res) => {
  res.render("ForgotPassword");
});
app.get("/auth/reset-password", (req, res) => {
  res.render("ResetPassword");
});

// routes errors
app.use(notFoundHandler);
app.use(errorHandler);
// connect server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server listenning on port " + port));

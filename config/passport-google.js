const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models");
const callbackURL = "/auth/google/redirect";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID_KEY,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        name: profile.displayName,
        providerId: profile.id,
        profilePic: profile.photos[0].value,
      };
      const currentUser = await User.findOne({
        where: { providerId: profile.id },
      });
      if (currentUser) {
        console.log("current user ", currentUser);
        done(null, currentUser);
      } else {
        newUser.role = (await User.count()) === 0 ? "admin" : "user";
        const user = await User.create(newUser);
        console.log("user ", user);
        done(null, user);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, user.id);
  });
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({
    where: { id: id },
  });
  done(null, user);
});

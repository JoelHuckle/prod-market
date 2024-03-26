const LocalStrategy = require("passport-local").Strategy;
const { OAuth2Strategy: GoogleStrategy } = require("passport-google-oauth");
const mongoose = require("mongoose");

const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    return done(null, await User.findById(id));
  } catch (error) {
    return done(error);
  }
});

// local signin
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() })
      .then((user) => {
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      })
      .catch((err) => done(err));
  })
);

/**
 * Sign in with Google.
 */
const googleStrategyConfig = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, params, profile, done) => {
    try {
      if (req.user) {
        const existingUser = await User.findOne({ google: profile.id });
        if (existingUser && existingUser.id !== req.user.id) {
          req.flash("errors", {
            msg: "There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.",
          });
          return done(null, existingUser);
        }
        const user = await User.findById(req.user.id);
        user.google = profile.id;
        user.tokens.push({
          kind: "google",
          accessToken,
          accessTokenExpires: moment()
            .add(params.expires_in, "seconds")
            .format(),
          refreshToken,
        });
        user.profile.name = user.profile.name || profile.displayName;
        user.profile.gender = user.profile.gender || profile._json.gender;
        user.profile.picture = user.profile.picture || profile._json.picture;
        await user.save();
        req.flash("info", { msg: "Google account has been linked." });
        return done(null, user);
      }
      const existingUser = await User.findOne({ google: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const existingEmailUser = await User.findOne({
        email: profile.emails[0].value,
      });
      if (existingEmailUser) {
        req.flash("errors", {
          msg: "There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.",
        });
        return done(null, existingEmailUser);
      }
      const user = new User();
      user.email = profile.emails[0].value;
      user.google = profile.id;
      user.tokens.push({
        kind: "google",
        accessToken,
        accessTokenExpires: moment().add(params.expires_in, "seconds").format(),
        refreshToken,
      });
      user.profile.name = profile.displayName;
      user.profile.gender = profile._json.gender;
      user.profile.picture = profile._json.picture;
      await user.save();
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);
passport.use("google", googleStrategyConfig);
refresh.use("google", googleStrategyConfig);

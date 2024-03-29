const passport = require("passport");
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
    callbackURL: "/auth/google/redirect",
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      // Check if there's a user logged in
      if (req.user) {
        // Linking Google account to existing user
        req.user.google = profile.id;
        await req.user.save();
        req.flash("info", { msg: "Google account has been linked." });
        return done(null, req.user);
      }

      // Find if the user with this Google ID exists
      let user = await User.findOne({ google: profile.id });

      // If user exists, return user
      if (user) return done(null, user);

      // If user doesn't exist, check if there's another user with the same email
      const existingEmailUser = await User.findOne({
        email: profile.emails[0].value,
      });

      if (existingEmailUser) {
        req.flash("errors", {
          msg: "There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.",
        });
        return done(null, existingEmailUser);
      }

      // Create a new user if no user with this Google ID or email exists
      user = new User();
      user.email = profile.emails[0].value;
      user.google = profile.id;
      await user.save();
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

passport.use("google", googleStrategyConfig);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

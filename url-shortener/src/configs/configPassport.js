/* eslint-disable no-console */
/* eslint-disable import/extensions */
import passport from 'passport';
import passpostGoogle from 'passport-google-oauth20';
import passportFacebook from 'passport-facebook';
import { User } from '../models/User.js';

const handleGoogleCallback = async (accessToken, _, tokenDetail, profile, done) => {
  // 'https://www.googleapis.com/auth/user.addresses.read',
  // 'https://www.googleapis.com/auth/user.phonenumbers.read',
  // 'https://www.googleapis.com/auth/user.birthday.read',
  const email = profile.emails[0].value;
  User.findOne({ email, connectGoogle: true })
    .then(existingUser => {
      if (existingUser) {
        done(null, existingUser);
      } else {
        User.findOne({ email }).then(
          user => {
            if (!user) {
              new User({ email, connectGoogle: true })
                .save()
                .then(newUser => {
                  done(null, newUser);
                });
            } else {
              User.updateOne({ email }, { connectGoogle: true }).then(
                updatedUser => { done(null, updatedUser); },
              );
            }
          },
        );
      }
    });
};

const handleFacebookCallback = async (accessToken, _, tokenDetail, profile, done) => {
  const email = profile.emails[0].value;
  User.findOne({ email, connectFacebook: true })
    .then(existingUser => {
      if (existingUser) {
        done(null, existingUser);
      } else {
        User.findOne({ email }).then(
          user => {
            if (!user) {
              new User({ email, connectFacebook: true })
                .save()
                .then(newUser => {
                  done(null, newUser);
                });
            } else {
              User.updateOne({ email }, { connectFacebook: true }).then(
                updatedUser => { done(null, updatedUser); },
              );
            }
          },
        );
      }
    });
};

const configPassport = () => {
// Using google Authentication.
  const GoogleStrategy = passpostGoogle.Strategy;
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  }, handleGoogleCallback));

  const FacebookStrategy = passportFacebook.Strategy;
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['email'],
  }, handleFacebookCallback));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((email, done) => {
    User.find({ email })
      .then(user => {
        done(null, user);
      });
  });
};

export default configPassport;

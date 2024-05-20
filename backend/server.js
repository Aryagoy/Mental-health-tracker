const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const fs = require('fs');
const path = require('path');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User, Log } = require('./models');
const getGoogleOAuthSecrets = require('./vault'); // Import the Vault secrets fetcher
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

require('dotenv').config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

// Fetch secrets from Vault and set environment variables
getGoogleOAuthSecrets().then((secrets) => {
  process.env.GOOGLE_CLIENT_ID = secrets.GOOGLE_CLIENT_ID;
  process.env.GOOGLE_CLIENT_SECRET = secrets.GOOGLE_CLIENT_SECRET;

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5001/auth/google/callback',
  },
    async (token, tokenSecret, profile, done) => {
      try {
        console.log('Google OAuth callback hit');
        let user = await User.findOne({ where: { googleId: profile.id } });
        if (!user) {
          user = await User.create({ googleId: profile.id, email: profile.emails[0].value });
        }
        return done(null, user);
      } catch (err) {
        console.error('Error in Google OAuth callback:', err);
        return done(err);
      }
    }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.get('/check-auth', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ isAuthenticated: true });
    } else {
      res.json({ isAuthenticated: false });
    }
  });

  app.get('/auth/google', (req, res, next) => {
    console.log('Google Auth route hit');
    next();
  }, passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      console.log('Google OAuth callback successful');
      res.redirect('http://localhost:3000');
    });

  app.get('/', (req, res) => {
    res.send('Welcome to the Mental Health Tracker backend');
  });

  app.post('/log', async (req, res) => {
    if (!req.user) return res.status(401).send('Unauthorized');
    const log = await Log.create({ ...req.body, userId: req.user.id });
    res.json(log);
  });

  app.get('/logs', async (req, res) => {
    if (!req.user) return res.status(401).send('Unauthorized');
    const logs = await Log.findAll({ where: { userId: req.user.id } });
    res.json(logs);
  });
  app.get('/logs/weekly', async (req, res) => {
    const getStartOfWeek = (date) => {
      const startOfWeek = new Date(date);
      const day = startOfWeek.getDay(); // Get the day of the week (0-6)
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
      startOfWeek.setDate(diff);
      startOfWeek.setHours(0, 0, 0, 0); // Set to start of the day
      return startOfWeek;
    };

    const getEndOfWeek = (date) => {
      const endOfWeek = new Date(getStartOfWeek(date));
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999); // Set to end of the day
      return endOfWeek;
    };

    const startOfWeek = getStartOfWeek(new Date());
    const endOfWeek = getEndOfWeek(new Date());
    console.log(startOfWeek,endOfWeek)


    if (!req.user) return res.status(401).send('Unauthorized');
    const logs = await Log.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
        [sequelize.fn('AVG', sequelize.col('sleep')), 'average_sleep'],
        [sequelize.fn('AVG', sequelize.col('mood')), 'average_mood'],
        [sequelize.fn('AVG', sequelize.col('anxiety')), 'average_anxiety']
      ],
      where: {
        userId: req.user.id, createdAt: {
          [Op.between]: [startOfWeek, endOfWeek]
        }
      },
      group: [sequelize.fn('DATE', sequelize.col('createdAt'))]
    });
    res.json(logs);
  });
  const PORT = process.env.PORT || 5001;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to fetch secrets from Vault:', err);
  process.exit(1); // Exit the process if secrets can't be fetched
});

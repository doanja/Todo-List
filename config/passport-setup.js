const passport = require('passport');
const GoogleStrat = require('passport-google-oauth20');
const keys = require('../config/keys');

passport.use(
    new GoogleStrat({
        // options for the Google strat
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }), () => {
        // passport callback function
    }
)
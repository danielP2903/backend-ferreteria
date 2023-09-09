const passport = require('passport');
const LocalStrategy = require('./strategys/local')

passport.use(LocalStrategy);
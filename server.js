require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios = require('axios');
const methodOverride = require('method-override');

const { country, favorite, user, quote } = require('./models');

// environment variables
SECRET_SESSION = process.env.SECRET_SESSION;

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(flash());            // flash middleware

app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));



// add passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});


app.get('/', function (req, res) {
  quote.findAll()
    .then(foundQuotes => {
      const cleaned_quotes = foundQuotes.map(c => c.toJSON());
      console.log(cleaned_quotes.length);
      let random_num = Math.floor(Math.random() * cleaned_quotes.length);
      let quote_export = cleaned_quotes[random_num];
      return res.render('index', { quotes: quote_export });
    })
    .catch(err => {
      console.log('Error', err);
      res.render('error-page');
    });

});

app.use('/auth', require('./controllers/auth'));
app.use('/profiles', require('./controllers/profiles'));
app.use('/countries', require('./controllers/countries'));
app.use('/favorites', require('./controllers/favorites'));
app.use('/quotes', require('./controllers/quotes'));



app.use(function (req, res, next) {
  res.locals.message = req.flash();
  next();
});

app.use(function (req, res) {
  res.status(404).render('error-page');
});
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;

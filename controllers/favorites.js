const express = require('express');
const router = express.Router();
const axios = require('axios');
const isLoggedIn = require('../middleware/isLoggedIn');
const session = require('express-session');
const flash = require('connect-flash');
const { country, favorite, user } = require('../models');
const app = express();

app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
app.use(flash());



router.get('/favorite', isLoggedIn, function (req, res) {

    favorite.findAll({
        where: { userId: parseInt(req.user.get().id) }
    })
        .then(foundFavorites => {

            const cleaned_favorites = foundFavorites.map(c => c.toJSON());
            console.log(cleaned_favorites);
            return res.render('favorites/favorite', { userFavorite: cleaned_favorites });
        });

});



router.post('/favorite', isLoggedIn, function (req, res) {
    // const { id, name, email } = req.user.get();
    const userId = req.user.get().id;
    favorite.findOrCreate({
        where: {
            userId: userId,
            name: req.body.countryName,
            flag: req.body.countryFlag,
            continents: req.body.countryContinents
        }
    })
        .then(([favorite, created]) => {

            console.log(favorite);
            console.log('created????', created);
            req.flash('message', 'created');
            return res.redirect(`/countries/${req.body.countryName}`);
            // popup.alert('hello');
        })
        .catch(err => {
            console.log('Error', err);
            // res.render('no-result');
        });

});



module.exports = router;
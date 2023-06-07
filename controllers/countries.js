const express = require('express');
const router = express.Router();
const axios = require('axios');
const isLoggedIn = require('../middleware/isLoggedIn');
const { country, favorite, user } = require('../models');
const app = express();

weatherApiKey = process.env.weatherApiKey;

router.get('/', isLoggedIn, function (req, res) {
    country.findAll()
        .then(countries => {
            favorite.findAll({
                where: {
                    userId: req.user.get().id
                }
            })
                .then(userFavorite => {
                    const cleaned_countries = countries.map(c => c.toJSON());
                    res.render('countries/index', { countries: cleaned_countries, userFavorite, });
                });
        })
        .catch(err => {
            console.log('Error', err);
            res.render('no-result');
        });
});

router.get('/search', isLoggedIn, function (req, res) {
    country.findAll({ order: [['name', 'ASC']] })
        .then(countries => {

            const cleaned_countries = countries.map(c => c.toJSON());
            // send as json
            res.render('countries/search', { countries: cleaned_countries });
        })
        .catch(err => {
            console.log('Error', err);
        });
});

router.get('/detail/:name', isLoggedIn, function (req, res) {
    country.findOne({
        where: { name: req.params.name }
    })
        .then(foundCountry => {

            axios.get(`https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${foundCountry.capital}&aqi=no`)
                .then(weather => {
                    const currentWeather = weather.data.current;
                    console.log(currentWeather);
                    res.render('countries/detail', { singleCountry: foundCountry, currentWeather });
                })
                .catch(err => {
                    console.log('Error', err);
                });
        })
        .catch(err => {
            console.log('Error', err);
        });
});


router.post('/search', isLoggedIn, function (req, res) {
    country.findAll()
        .then(countries => {
            console.log('req.body', req.body);
            // if (!req.body.country) {
            //     req.flash('error', 'Select a Country');
            //     return res.redirect('search');
            // } else {
            return res.redirect(`/countries/${req.body.country}`);
            // }
            // res.render('countries/search', { countries: cleaned_countries });
        })
        .catch(err => {
            console.log('Error', err);
            // res.render('no-result');
        });

});

router.get('/:name', isLoggedIn, function (req, res) {
    country.findOne({
        where: { name: req.params.name }
    })
        .then(foundCountry => {
            favorite.findAll({
                where: {
                    userId: req.user.get().id
                }
            })
                .then(userFavorite => {
                    country.findAll({ order: [['name', 'ASC']] })
                        .then(countries => {
                            res.render('countries/country', { singleCountry: foundCountry, countries: countries, userFavorite });
                        })
                        .catch(err => {
                            console.log('Error', err);
                        });
                })
                .catch(err => {
                    console.log('Error', err);
                });
        })
        .catch(err => {
            console.log('Error', err);
        });
});

router.delete('/:name', isLoggedIn, function (req, res) {
    favorite.destroy({
        where: {
            userId: req.user.id,
            name: req.body.countryName
        }
    })
        .then(deleted => {
            console.log('country name', req.body.countryName);
            return res.redirect(`/countries/${req.body.countryName}`);
        })
        .catch(err => {
            console.log('Errorrrrrrr', err);
            // res.render('no-result');
        });

});

module.exports = router;
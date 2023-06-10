const express = require('express');
const router = express.Router();
const axios = require('axios');
const isLoggedIn = require('../middleware/isLoggedIn');
const { country, favorite, user } = require('../models');
const app = express();

weatherApiKey = process.env.weatherApiKey;
mapApiKey = process.env.mapApiKey;

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
            res.render('error-page');
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
            res.render('error-page');
        });
});

router.get('/searchby', isLoggedIn, function (req, res) {
    country.findAll({ order: [['name', 'ASC']] })
        .then(countries => {

            const cleaned_countries = countries.map(c => c.toJSON());
            // send as json
            res.render('countries/searchby', { countries: cleaned_countries });
        })
        .catch(err => {
            console.log('Error', err);
            res.render('error-page');
        });
});

router.get('/detail/:name', isLoggedIn, function (req, res) {
    country.findOne({
        where: { name: req.params.name }
    })
        .then(foundCountry => {
            const mapUrl = `https://api.mapbox.com/styles/v1/randomdori/clipiz7bc009l01od118t14yz.html?title=view&access_token=${mapApiKey}&zoomwheel=true&fresh=true#3.78/39.13/-96.67`;
            axios.get(`https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${foundCountry.capital}&aqi=yes`)
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
            res.render('error-page');
        });
});

router.post('/search', isLoggedIn, function (req, res) {
    country.findAll()
        .then(countries => {
            return res.redirect(`/countries/${req.body.country}`);
        })
        .catch(err => {
            console.log('Error', err);
            res.render('error-page');
        });

});

router.post('/searchby', isLoggedIn, function (req, res) {
    country.findAll()
        .then(countries => {
            const cleaned_countries = countries.map(c => c.toJSON());
            const result = [];
            switch (req.body.field) {
                case 'region':
                    for (let i = 0; i < cleaned_countries.length; i++) {
                        let country = cleaned_countries[i];
                        if (country.region.toLowerCase() === req.body.item.toLowerCase()) {
                            result.push(country);
                        }
                    }
                    break;
                case 'subregion':
                    for (let i = 0; i < cleaned_countries.length; i++) {
                        let country = cleaned_countries[i];
                        if (country.subregion.toLowerCase() === req.body.item.toLowerCase()) {
                            result.push(country);
                        }
                    }
                    break;
                case 'unmember':
                    for (let i = 0; i < cleaned_countries.length; i++) {
                        let country = cleaned_countries[i];
                        if (country.unMember) {
                            result.push(country);
                        }
                    }
                    break;
            }
            res.render('countries/searchby-result', { countries: result });
        })
        .catch(err => {
            console.log('Error', err);
            res.render('error-page');
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
                            res.render('error-page');
                        });
                })
                .catch(err => {
                    console.log('Error', err);
                    res.render('error-page');
                });
        })
        .catch(err => {
            console.log('Error', err);
            res.render('error-page');
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
            req.flash('removed', `'${req.body.countryName}' removed from your favorite list.`);
            return res.redirect(`/countries/${req.body.countryName}`);
        })
        .catch(err => {
            console.log('Errorrrrrrr', err);
            res.render('error-page');
        });

});

module.exports = router;
const express = require('express');
const router = express.Router();
const axios = require('axios');
const isLoggedIn = require('../middleware/isLoggedIn');
const { country, favorite, user } = require('../models');
const app = express();

router.get('/:id', isLoggedIn, function (req, res) {

    favorite.findAll({
        where: { userId: req.params.id }
    })
        .then(foundFavorites => {
            const cleaned_favorites = foundFavorites.map(c => c.toJSON());

            return res.render('favorites/favorite', { userFavorite: cleaned_favorites });
        })
        .catch(err => {
            console.log('Error', err);
            res.render('error-page');
        });

});

router.delete('/:id', isLoggedIn, async (req, res) => {
    try {

        const { id } = req.params;
        const userId = req.user.id;

        await favorite.destroy({
            where: { userId, id }
        });

        res.redirect(`/favorites/${userId}`);
    } catch (error) {
        console.error(error);
        res.render('error-page');
    }
});


router.post('/:id', isLoggedIn, function (req, res) {
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
            if (created === true) {
                req.flash('added', `'${req.body.countryName}' added to your favorite list!`);
                res.redirect(`/countries/${req.body.countryName}`);
            } else {
                req.flash('removed', `'${req.body.countryName}' removed from your favorite list.`);
                res.redirect(`/countries/${req.body.countryName}`);
            }
            // return res.redirect(`/countries/${req.body.countryName}`);
        })
        .catch(err => {
            console.log('Error', err);
            res.render('error-page');
        });
});

router.post('/detail/:id', isLoggedIn, function (req, res) {
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
            if (created === true) {
                req.flash('added', `'${req.body.countryName}' added to your favorite list!`);
                res.redirect(`/countries/detail/${req.body.countryName}`);
            } else {
                req.flash('removed', `'${req.body.countryName}' removed from your favorite list.`);
                res.redirect(`/countries/detail/${req.body.countryName}`);
            }
            // return res.redirect(`/countries/${req.body.countryName}`);
        })
        .catch(err => {
            console.log('Error', err);
            res.render('error-page');
        });
});

module.exports = router;
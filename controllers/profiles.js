const express = require('express');
const router = express.Router();
const axios = require('axios');
const isLoggedIn = require('../middleware/isLoggedIn');
const { country, favorite, user } = require('../models');
const app = express();

router.get('/:id', isLoggedIn, (req, res) => {
    user.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(foundUser => {
            res.render('profiles/profile', { foundUser });
        })
        .catch(err => {
            console.log('Error', err);
            res.render('error-page');
        });
});

router.get('/edit/:id', isLoggedIn, (req, res) => {
    user.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(foundUser => {
            res.render('profiles/edit', { foundUser });
        })
        .catch(err => {
            console.log('Error', err);
            res.render('error-page');
        });
});

router.delete('/:id', isLoggedIn, (req, res) => {
    favorite.destroy({
        where: { userId: req.user.id }
    })
        .then((numOfRowsDeleted) => {
            if (numOfRowsDeleted > 0) {
                req.flash('removed', `Your favorite list is empty now`);
                res.redirect(`/profiles/${parseInt(req.params.id)}`);
            } else {
                req.flash('removed', `Your favorite list is already empty`);
                res.redirect(`/profiles/${parseInt(req.params.id)}`);
            }

        })
        .catch((error) => {
            console.error(error);
            res.render('error-page');
        });
});

router.put('/edit/:id', isLoggedIn, function (req, res) {
    // find the capsule, and then go edit page
    console.log('form data', req.body);

    const parsed_user_data = { ...req.body };

    parsed_user_data.name = req.body.name;
    parsed_user_data.email = req.body.email;

    user.update(parsed_user_data, {
        where: { id: req.params.id }
    })
        .then(numOfRowsChanged => {
            console.log('how many rows got updated?', numOfRowsChanged);
            res.redirect(`/profiles/${parseInt(req.params.id)}`);
        })
        .catch(err => { console.log('Error', err), res.render('error-page'); });
});

router.put('/:id', isLoggedIn, function (req, res) {

    const parsed_user_data = { ...req.user };

    parsed_user_data.active = false;

    user.update(parsed_user_data, {
        where: { id: req.params.id }
    })
        .then(() => {
            req.logOut(function (err, next) {
                if (err) { return next(err); }
                req.flash('success', 'Account Deleted.  Hope you come back!');
                res.redirect('/');
            });
        })
        .catch(err => { console.log('Error', err), res.render('error-page'); });
});

module.exports = router;
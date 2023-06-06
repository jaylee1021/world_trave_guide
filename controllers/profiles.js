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
        });
});

router.delete('/:id', isLoggedIn, (req, res) => {
    const id = req.user.id;
    favorite.destroy({
        where: { userId: id }
    })
        .then((numOfRowsDeleted) => {
            console.log('favorite deleted?', numOfRowsDeleted);
            user.destroy({
                where: { id }
            })
                .then((numOfRowsDeleted) => {
                    console.log('user deleted?', numOfRowsDeleted);
                    res.redirect('/auth/login');
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
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
        .catch(err => console.log('Error', err));
});

module.exports = router;
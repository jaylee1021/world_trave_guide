const express = require('express');
const router = express.Router();
const axios = require('axios');
const isLoggedIn = require('../middleware/isLoggedIn');
const { country, favorite, user, quote } = require('../models');
const app = express();

router.get('/insert-quote', isLoggedIn, function (req, res) {
    res.render('quotes/insert-quote');
});

router.post('/insert-quote', isLoggedIn, function (req, res) {
    const parsed_data = { ...req.body };
    parsed_data.statement = req.body.statement;
    parsed_data.author = req.body.author;

    quote.create(parsed_data)
        .then((quotess, created) => {
            req.flash('added', `Quote added to your list!`);
            res.redirect('insert-quote');
        })
        .catch(err => {
            console.log('Error', err);
        });
});

module.exports = router;
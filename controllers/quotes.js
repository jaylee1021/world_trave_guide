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

router.get('/list-of-quotes', isLoggedIn, function (req, res) {

    quote.findAll()
        .then(foundQuotes => {

            const cleaned_quotes = foundQuotes.map(c => c.toJSON());

            return res.render('quotes/list-of-quotes', { allQuotes: cleaned_quotes });
        })
        .catch(err => {
            console.log('Error', err);
            res.render('error-page');
        });

});

router.delete('/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;

        await quote.destroy({
            where: { id }
        });

        res.redirect('/quotes/list-of-quotes');
    } catch (error) {
        console.error(error);
        res.render('error-page');
    }
});

module.exports = router;
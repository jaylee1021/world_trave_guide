const express = require('express');
const router = express.Router();
const axios = require('axios');
const isLoggedIn = require('../middleware/isLoggedIn');
const { country, favorite, user, quote } = require('../models');
const app = express();

router.get('/insert-quote', isLoggedIn, function (req, res) {
    res.render('quotes/insert-quote');
});

// router.delete('/:id', isLoggedIn, async (req, res) => {
//     try {

//         const { id } = req.params;
//         const userId = req.user.id;

//         await favorite.destroy({
//             where: { userId, id }
//         });

//         res.redirect(`/favorites/${userId}`);
//     } catch (error) {
//         console.error(error);
//         res.render('error-page');
//     }
// });


router.post('/insert-quote', isLoggedIn, function (req, res) {
    // const { id, name, email } = req.user.get();

    const parsed_data = { ...req.body };
    parsed_data.statement = req.body.statement;
    parsed_data.author = req.body.author;

    quote.create(parsed_data)
        .then((quotess, created) => {

            req.flash('added', `Quote added to your list!`);
            res.redirect('insert-quote');

            // return res.redirect(`/countries/${req.body.countryName}`);
        })
        .catch(err => {
            console.log('Error', err);
            res.render('error-page');
        });
});

module.exports = router;
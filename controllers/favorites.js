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
            // res.render('no-result');
        });

});

// DELETE /savedArticles/delete/:id - Delete a saved article
router.delete('/:id', isLoggedIn, async (req, res) => {
    try {
        // Retrieve the article ID from the request parameters
        const { id } = req.params;
        const userId = req.user.id;
        console.log('id', id);
        console.log('userId', userId);
        // Delete the article from the database or any other data source
        await favorite.destroy({
            where: { userId, id }, // Delete the article for the logged-in user based on the ID and author
        });

        // Redirect back to the saved articles page
        res.redirect(`/favorites/${userId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
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
            console.log(favorite);
            console.log('created????', created);
            if (created === false) {
                req.flash('present', `'${req.body.countryName}' already exists in your favorite list.`);
                res.redirect(`/countries/${req.body.countryName}`);
            } else {
                req.flash('added', `'${req.body.countryName}' added to your favorite list!`);
                res.redirect(`/countries/${req.body.countryName}`);
            }
            // return res.redirect(`/countries/${req.body.countryName}`);
        })
        .catch(err => {
            console.log('Error', err);
            // res.render('no-result');
        });
});

// POST /savedArticles/delete/:id - Delete a saved article
// router.post('/delete/:id', isLoggedIn, async (req, res) => {
//     try {
//         // Retrieve the article ID from the request parameters
//         const { id } = req.params;
//         const userId = req.user.id;
//         // Delete the article from the database or any other data source
//         await favorite.destroy({
//             where: { userId, id }, // Delete the article for the logged-in user based on the ID and author
//         });

//         // Redirect back to the saved articles page
//         res.redirect(`/favorites/${userId}`);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });




// router.delete('/favorite', function (req, res) {
//     const userId = req.user.get().id;
//     favorite.destroy({
//         where: {
//             userId: userId,

//             id: parseInt(req.params.id)
//         }
//     })
//         .then(numOfRowsDeleted => {
//             console.log('How many rows were deleted?', numOfRowsDeleted);
//             // redirect the user back to all members page /members
//             res.redirect('/capsules');
//         })
//         .catch(err => {
//             console.log('Error', err);
//             res.render('no-result');
//         });
// });




module.exports = router;
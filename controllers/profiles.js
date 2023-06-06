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
            console.log('found user', foundUser.toJSON());
            // const { id, name, email } = req.user.get();

            res.render('profiles/profile', { foundUser });
        })
        .catch(err => {
            console.log('Error', err);

        });

});

// router.delete('/delete/:id', function (req, res) {
//     // console.log('user id', req.user.get().id);
//     console.log('req. params', req.params.id);
//     user.destroy({
//         where: { id: parseInt(req.params.id) }
//     })
//         .then(numOfRowsDeleted => {
//             console.log('How many rows were deleted?', numOfRowsDeleted);
//             // redirect the user back to all members page /members
//             res.redirect('/auth/login');
//         })
//         .catch(err => {
//             console.log('Error', err);

//         });
// });

// POST /savedArticles/delete/:id - Delete a saved article
router.post('/delete/:id', isLoggedIn, async (req, res) => {
    try {
        // Retrieve the article ID from the request parameters
        const { id } = req.params;
        const userId = req.user.id;
        // Delete the article from the database or any other data source
        await user.destroy({
            where: { userId }, // Delete the article for the logged-in user based on the ID and author
        });

        // Redirect back to the saved articles page
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.delete('/delete/:id', isLoggedIn, async (req, res) => {
    try {
        // Retrieve the article ID from the request parameters
        const { id } = req.params;
        const userId = req.user.id;
        // Delete the article from the database or any other data source
        await favorite.destroy({
            where: { userId }, // Delete the article for the logged-in user based on the ID and author
        });

        // Redirect back to the saved articles page
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
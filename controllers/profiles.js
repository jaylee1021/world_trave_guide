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

router.delete('/:id', function (req, res) {
    console.log('user id', req.user.get().id);
    user.destroy({
        where: { id: parseInt(req.user.get().id) }
    })
        .then(numOfRowsDeleted => {
            console.log('How many rows were deleted?', numOfRowsDeleted);
            // redirect the user back to all members page /members
            res.redirect('/auth/login');
        })
        .catch(err => {
            console.log('Error', err);

        });
});

module.exports = router;
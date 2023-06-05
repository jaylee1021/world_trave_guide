const express = require('express');
const router = express.Router();
const axios = require('axios');
const isLoggedIn = require('../middleware/isLoggedIn');
const { country, favorite, user } = require('../models');
const app = express();


// /capsules route
router.get('/', isLoggedIn, function (req, res) {
    // axios.get('https://api.spacexdata.com/v4/capsules')
    //     .then(function (response) {
    //         // handle success
    //         return res.render('capsules', { capsules: response.data });
    //     })
    //     .catch(function (error) {
    //         res.json({ message: 'Data not found. Please try again later.' });
    //     });

    // READ all capsules send capsules to 
    country.findAll()
        .then(countries => {

            favorite.findAll({
                where: {
                    userId: req.user.get().id
                }
            })
                .then(userFavorite => {
                    const cleaned_countries = countries.map(c => c.toJSON());
                    res.render('countries/index', { countries: cleaned_countries, userFavorite });
                });


        })
        .catch(err => {
            console.log('Error', err);
            res.render('no-result');
        });
});


// // /capsules/edit/:id -> go to the page that allows to edit
// router.get('/edit/:id', function (req, res) {
//     // find the capsule, and then go edit page
//     capsule.findOne({
//         where: { id: parseInt(req.params.id) }
//     })
//         .then(foundCapsule => {
//             return res.render('capsules/edit', { capsule: foundCapsule });
//         })
//         .catch(err => {
//             console.log('Error', err);
//             res.render('no-result');
//         });

// });


// // /capsules/new -> go to page to create a new capsule
// router.get('/new', function (req, res) {
//     return res.render('capsules/new');
// });

// // /capsule/search route
// router.get('/search', function (req, res) {
//     return res.render('capsules/search');
// });

router.get('/search', isLoggedIn, function (req, res) {
    country.findAll({ order: [['name', 'ASC']] })
        .then(countries => {

            const cleaned_countries = countries.map(c => c.toJSON());
            // send as json
            console.log('countries', cleaned_countries);
            res.render('countries/search', { countries: cleaned_countries });
        })
        .catch(err => {
            console.log('Error', err);
        });
});

router.post('/search', isLoggedIn, function (req, res) {
    country.findAll()
        .then(countries => {
            console.log('req.body', req.body);
            // if (!req.body.country) {
            //     req.flash('error', 'Select a Country');
            //     return res.redirect('search');
            // } else {
            return res.redirect(`/countries/${req.body.country}`);
            // }
            // res.render('countries/search', { countries: cleaned_countries });
        })
        .catch(err => {
            console.log('Error', err);
            // res.render('no-result');
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
                        });
                })
                .catch(err => {
                    console.log('Error', err);
                });
        })
        .catch(err => {
            console.log('Error', err);
        });
});

router.delete('/:name', isLoggedIn, function (req, res) {
    favorite.destroy({
        where: {
            userId: req.user.get().id,
            name: req.body.country
        }
            .then(deleted => {
                console.log('country name', req.body.country);
                return res.redirect(`/countries/${req.body.country}`);
            })
            .catch(err => {
                console.log('Errorrrrrrr', err);
                // res.render('no-result');
            })
    });
});



// router.post('/new', function (req, res) {
//     // create a capsule with the form data
//     const parsed_capsule = { ...req.body };
//     // change datatype for reuse_count and water_landings
//     parsed_capsule.reuse_count = parseInt(req.body.reuse_count);
//     parsed_capsule.water_landings = parseInt(req.body.water_landings);

//     // create a capsule
//     capsule.create(parsed_capsule)
//         .then(createdCapsule => {
//             console.log('capsule created', createdCapsule.toJSON());
//             res.redirect('/capsules');
//         })
//         .catch(err => {
//             console.log('Error', err);
//             res.render('no-result');
//         });
// });



// router.put('/edit/:id', function (req, res) {
//     // find the capsule, and then go edit page
//     console.log('form data', req.body);

//     const parsed_capsule = { ...req.body };
//     // change datatype for reuse_count and water_landings
//     parsed_capsule.reuse_count = parseInt(req.body.reuse_count);
//     parsed_capsule.water_landings = parseInt(req.body.water_landings);
//     console.log('parsed_capsule: ', parsed_capsule);

//     capsule.update(parsed_capsule, {
//         where: { id: parseInt(req.params.id) }
//     })
//         .then(numOfRowsChanged => {
//             console.log('how many rows got updated?', numOfRowsChanged);
//             res.redirect(`/capsules/${parseInt(req.params.id)}`);
//         })
//         .catch(err => console.log('Error', err));
//     // capsule.findOne({
//     //     where: { id: parseInt(req.params.id) }
//     // })
//     // .then(foundCapsule => {
//     //     // found capsule
//     //     return res.render('capsules/edit', { capsule: foundCapsule });
//     // })
//     // .catch(err => {
//     //     console.log('Error', err);
//     //     res.render('no-result');
//     // })
// });

// router.delete('/:id', function (req, res) {
//     capsule.destroy({
//         where: { id: parseInt(req.params.id) }
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
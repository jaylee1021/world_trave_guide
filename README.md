# World Travel Guide

SEIRFX 221 Project 2: World Travel Guide

The Goal is to provide information about select country.

# How To Use

1. Create an account
2. Search for a country
    a. Search page
    b. Search by page
3. Save the country on favorite list 
    a. Add or delete countries from favorite list
    
<hr />

# Screenshots

## HOME
![home](/public/image/home.png)
<hr />

## LOGIN

![login](/public/image/login.png)
<hr />

## SEARCH

![search](/public/image/search.png)
<hr />

## COUNTRY

![country](/public/image/country.png)
<hr />

## SIGNUP

![signup](/public/image/signup.png)






<hr />

# HOW TO INSTALL

* Requires `node.js`, `postgres`, and `sequelize`
1. `Fork` and `Clone` this repository to your local machine.
2. Run `npm run dev` to start server.
3. Open `localhost:8000` in your broswer to use the app or 
4. Open the directory in your text editor of choice to view or edit the code

<hr />

# How the App works

1. All of the country data are `seeded` to local machine for faster access.
2. Once country is selected, it will go through the database and output the necessary data.
3. Also, Current weather information is provided directly from the weather api.
4. Quote in the homepage is randomly picked from an array of quotes I've picked out on a separate js 

### API Calls
Most of the data used in this app is from the country api.  All of the data are seeded from the country api for easy and fast access.

```javascript
await axios.get('https://restcountries.com/v3.1/all')
      .then(async response => {
        const countries = response.data.map(c => {
          let currencies;
          let currencies_name;
          let capital;
          let languages;
          if (c.currencies) {
            currencies = Object.keys(c.currencies)[0];
            currencies_name = c.currencies[Object.keys(c.currencies)[0]].name;
          }
          if (c.capital) {
            capital = c.capital[0];
          }
          if (c.languages) {
            languages = Object.values(c.languages).toString().split(',').join(', ');
          }
          // console.log(currencies, currencies_name, capital, languages);
          const result = {
            name: c.name.common,
            official_name: c.name.official,
            independent: c.independent,
            unMember: c.unMember,
            currencies: currencies,
            currencies_name: currencies_name,
            capital: capital,
            altSpellings: c.altSpellings.join(', '),
            region: c.region,
            subregion: c.subregion,
            languages: languages,
            area: c.area,
            maps: c.maps.googleMaps,
            population: c.population,
            timezone: c.timezones[0],
            continents: c.continents[0],
            flags: c.flags.png,
            coatOfArms: c.coatOfArms.png,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          return result;
        });
        console.log('new country', countries);
        // await queryInterface.bulkInsert('countries', countries, {});
      })
      .catch(err => console.log(err));
```

Also, another api call is made to get the current weather data by using the capital of each countries.
```javascript
axios.get(`https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${foundCountry.capital}&aqi=no`)
    .then(weather => {
        const currentWeather = weather.data.current;
        res.render('countries/detail', { singleCountry: foundCountry, currentWeather });
    })
    .catch(err => {
        console.log('Error', err);
    });
```

# Most used route
Most route that would be used in this app is .get route for single country data since this is where the user would go first after searching for a country.
For easy access, I have added another dropdown search box so the user doesn't have to go back to search page.
```javascript
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
                            res.render('error-page');
                        });
                })
                .catch(err => {
                    console.log('Error', err);
                    res.render('error-page');
                });
        })
        .catch(err => {
            console.log('Error', err);
            res.render('error-page');
        });
});
```

# Attribution

1. Rest Countries free API https://restcountries.com/
2. Weather API https://www.weatherapi.com/
3. Few travel quotes from https://capturetheatlas.com/quotes-about-travel/
4. Background image by Jakob Braun https://unsplash.com/photos/vpsPRd_rz-A

<hr />

# Future Consideration
1. More information about the countries
2. List of Must eat food
3. List of places to visit
4. More detailed weather data
5. Forgot password functionality
6. Reset password functionality 

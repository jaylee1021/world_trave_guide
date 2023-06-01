'use strict';
const axios = require('axios');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
          console.log(currencies, currencies_name, capital, languages);
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
        await queryInterface.bulkInsert('countries', countries, {});
      })
      .catch(err => console.log(err));
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('countries', null, {});
  }
};

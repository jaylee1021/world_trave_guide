'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      official_name: {
        type: Sequelize.STRING
      },
      independent: {
        type: Sequelize.BOOLEAN
      },
      unMember: {
        type: Sequelize.BOOLEAN
      },
      currencies: {
        type: Sequelize.STRING
      },
      currencies_name: {
        type: Sequelize.STRING
      },
      capital: {
        type: Sequelize.STRING
      },
      altSpellings: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.FLOAT
      },
      lng: {
        type: Sequelize.FLOAT
      },
      subregion: {
        type: Sequelize.STRING
      },
      languages: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.INTEGER
      },
      maps: {
        type: Sequelize.STRING
      },
      population: {
        type: Sequelize.BIGINT
      },
      timezone: {
        type: Sequelize.STRING
      },
      continents: {
        type: Sequelize.STRING
      },
      flags: {
        type: Sequelize.STRING
      },
      coatOfArms: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('countries');
  }
};
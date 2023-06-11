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
    const quotesList = [
      {
        statement: "I haven't been everywhere but it's on my list",
        author: "ANONYMOUS"
      },
      {
        statement: "Live Your Life By A Compass, Not A Clock",
        author: "ERICA JONG"
      },
      {
        statement: "Take Only Memories, Leave Only Footprints",
        author: "CHIEF SEATTLE"
      },
      {
        statement: "There Is A World Elsewhere",
        author: "SHAKESPEARE"
      },
      {
        statement: "A Journey Of A Thousand Miles Begins With A Single Step",
        author: "LAO TZU"
      },
      {
        statement: "Life Begins At The End Of your Comfort Zone",
        author: "NEALE DONALD WALSCH"
      },
      {
        statement: "WE TRAVEL NOT TO ESCAPE LIFE, BUT FOR LIFE NOT TO ESCAPE US",
        author: "ANONYMOUS"
      },
      {
        statement: "THE WORLD IS A BOOK AND THOSE WHO DO NOT TRAVEL READ ONLY ONE PAGE",
        author: "ST. AUGUSTINE"
      },
      {
        statement: "THERE ARE NO FOREIGN LANDS. IT IS THE TRAVELER ONLY WHO IS FOREIGN",
        author: "ROBERT LOUIS STEVENSON"
      },
      {
        statement: "THERE WAS NOWHERE TO GO BUT EVERYWHERE, SO JUST KEEP ON ROLLING UNDER THE STARS",
        author: "JACK KEROUAC"
      }
    ];

    const quotes = quotesList.map(c => {
      const result = {
        statement: c.statement,
        author: c.author,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return result;
    });
    console.log('listlislist', quotes);

    await queryInterface.bulkInsert('quotes', quotes, {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

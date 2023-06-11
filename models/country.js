'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  country.init({
    name: DataTypes.STRING,
    official_name: DataTypes.STRING,
    cca3: DataTypes.STRING,
    independent: DataTypes.BOOLEAN,
    unMember: DataTypes.BOOLEAN,
    currencies: DataTypes.STRING,
    currencies_name: DataTypes.STRING,
    capital: DataTypes.STRING,
    altSpellings: DataTypes.STRING,
    languages: DataTypes.STRING,
    region: DataTypes.STRING,
    subregion: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    borders: DataTypes.STRING,
    fifa: DataTypes.STRING,
    area: DataTypes.INTEGER,
    maps: DataTypes.STRING,
    population: DataTypes.BIGINT,
    timezone: DataTypes.STRING,
    continents: DataTypes.STRING,
    flags: DataTypes.STRING,
    coatOfArms: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'country',
  });
  return country;
};
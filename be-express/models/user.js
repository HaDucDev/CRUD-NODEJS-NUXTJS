'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    company_name: DataTypes.STRING,
    contact_firstname: DataTypes.STRING,
    contact_lastname: DataTypes.STRING,
    contact_email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
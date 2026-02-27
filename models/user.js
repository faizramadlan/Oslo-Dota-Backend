"use strict";
const { Model } = require("sequelize");
const { hashPass } = require("../helpers/index");
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
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Username Already Taken" },
        validate: {
          notNull: { msg: "Username is Required" },
          notEmpty: { msg: "Username is Required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email Already Registered" },
        validate: {
          notNull: { msg: "Email is Required" },
          notEmpty: { msg: "Email is Required" },
          isEmail: { msg: "Email format is invalid" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isSubscribed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPass(user.password);
        },
      },
    }
  );
  return User;
};

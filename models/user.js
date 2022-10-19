'use strict';
const { Model } = require('sequelize');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.History, {
        as: 'history',
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
      User.hasOne(models.Biodata, {
        as: 'biodata',
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }

    static #encrypt = (password) => bcrypt.hashSync(password, 10);

    static register = ({ username, password }) => {
      const encryptedPassword = this.#encrypt(password);
      return this.create({ username, password: encryptedPassword });
    };

    checkPassword = (password) => bcrypt.compareSync(password, this.password);

    static authenticate = async ({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username } });
        if (!user) return Promise.reject('User not found!');
        const isPasswordValid = user.checkPassword(password);
        if (!isPasswordValid) return Promise.reject('Wrong password');
        return Promise.resolve(user);
      } catch (err) {
        return Promise.reject(err);
      }
    };

    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username,
      };
      const rahasia = 'Ini Rahasia';
      const token = jwt.sign(payload, rahasia);
      return token;
    };
  }

  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};

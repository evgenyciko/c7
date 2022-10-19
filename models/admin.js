'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static #encrypt = (password) => bcrypt.hashSync(password, 10);

    static register = ({ username, password }) => {
      const encryptedPassword = this.#encrypt(password);
      return this.create({ username, password: encryptedPassword });
    };

    /* Method .compareSync digunakan untuk mencocokkan plaintext dengan hash. */
    checkPassword = (password) => bcrypt.compareSync(password, this.password);

    /* Method Authenticate, untuk login */
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
  }

  Admin.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Admin',
    }
  );
  return Admin;
};

"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async comparePWD(pwd) {
      const isMatch = await bcrypt.compare(pwd, this.password);
      return isMatch;
    }
    static associate(models) {
      // define association here
      this.hasOne(models.Cart, { foreignKey: "product_user_fk" });
      this.hasOne(models.Address, { foreignKey: "user_address_fk" });
      // this.hasOne(models.Token, { foreignKey: "user_token_fk" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 6,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verificationToken: {
        type: DataTypes.STRING,
      },
      verifiedDate: {
        type: DataTypes.DATE,
      },
      passwordToken: {
        type: DataTypes.STRING,
      },
      passwordTokenExpirationDate: {
        type: DataTypes.DATE,
       
      },
      role: {
        type: DataTypes.ENUM,
        values: ["admin", "user"],
        defaultValue: "user",
      },
    },
    {
      hooks: {
        beforeSave: async (user, options) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
      },
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );
  return User;
};

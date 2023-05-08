"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product, { foreignKey: "product_user_fk" });
      this.hasOne(models.Cart, { foreignKey: "cart_user_fk" });
      this.hasOne(models.Address, { foreignKey: "user_address_fk" });
      this.hasONe(models.Token, { foreignKey: "user_token_fk" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
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
      passworkToken: {
        type: DataTypes.STRING,
      },
      passworkTokenExpirationDate: {
        type: DataTypes.DATE,
      },
      profilePic: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["admin", "user"],
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );
  return User;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      this.hasMany(models.Product, { foreignKey: "cart_product_fk" });
      this.belongsTo(models.User, { foreignKey: "product_user_fk" });
    }
  }
  Cart.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Products",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      dateOfHire: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      expirationDate: {
        type: DataTypes.DATE,
      },
      amountOfDateHire: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Cart",
      timestamps: true,
    }
  );
  return Cart;
};

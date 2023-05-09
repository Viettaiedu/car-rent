"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Cart, { foreignKey: "product_user_fk" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: ["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"],
        defaultValue: "Sport",
      },
      capacity: {
        type: DataTypes.ENUM,
        values: ["2 Person", "4 Person", "6 Person", "8 or more"],
        defaultValue: "2 Person",
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 1000,
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      mountOfGasoline: {
        type: DataTypes.ENUM,
        values: ["70L", "80L", "90L"],
        defaultValue: "70L",
      },
      makeOf: {
        type: DataTypes.ENUM,
        values: ["Manual", "Elictric"],
        defaultValue: "Manual",
      },
      category: {
        type: DataTypes.ENUM,
        values: ["Popular", "Recommendation Car"],
        defaultValue: "Popular",
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: true,
    }
  );
  return Product;
};

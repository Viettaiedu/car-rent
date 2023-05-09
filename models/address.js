"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User , {foreignKey :'user_address_fk'})
    }
  }
  Address.init(
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
      province: {
        type: DataTypes.STRING,
      },
      distric: {
        type: DataTypes.STRING,
      },
      village: {
        type: DataTypes.STRING,
      },
      profilePic: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Address",
      timestamps: true,
    }
  );
  return Address;
};

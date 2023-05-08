"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "user_token_fk" });
    }
  }
  Token.init(
    {
      refreshToken: {
        type: DataTypes.STRING,
      },
      userAgent: { type: DataTypes.STRING },
      isValid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      ip: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Token",
      timestamps: true,
    }
  );
  return Token;
};

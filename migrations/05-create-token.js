"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Token", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      refreshToken: {
        type: Sequelize.STRING,
      },
      userAgent: { type: Sequelize.STRING },
      isValid: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      ip: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Token");
  },
};

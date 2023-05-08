"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("Cart", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
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
        productId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Products",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        dateOfHire: {
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
        expirationDate: {
          type: Sequelize.DATE,
        },
        amountOfDateHire: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
      })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cart");
  },
};

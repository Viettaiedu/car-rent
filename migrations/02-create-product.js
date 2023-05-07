"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values: ["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"],
        defaultValue: "Sport",
      },
      capacity: {
        type: Sequelize.ENUM,
        values: ["2 Person", "4 Person", "6 Person", "8 or more"],
        defaultValue: "2 Person",
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: 1000,
      },
      discount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      mountOfGasoline: {
        type: Sequelize.ENUM,
        values: ["70L", "80L", "90L"],
        defaultValue: "70L",
      },
      makeOf: {
        type: Sequelize.ENUM,
        values: ["Manual", "Elictric"],
        defaultValue: "Manual",
      },
      category: {
        type: Sequelize.ENUM,
        values: ["Popular", "Recommendation Car"],
        defaultValue: "Popular",
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
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
    await queryInterface.dropTable("Products");
  },
};

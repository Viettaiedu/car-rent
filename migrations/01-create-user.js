"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      providerId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profilePic: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM,
        values: ["admin", "user"],
        defaultValue: "user",
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue:new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue:new Date()
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};

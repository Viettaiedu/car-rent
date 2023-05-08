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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        min: 6,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      verificationToken: {
        type: Sequelize.STRING,
      },
      verifiedDate: {
        type: Sequelize.DATE,
      },
      passworkToken: {
        type: Sequelize.STRING,
      },
      passworkTokenExpirationDate: {
        type: Sequelize.DATE,
      },
      profilePic: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM,
        values: ["admin", "user"],
        defaultValue: "user",
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
    await queryInterface.dropTable("Users");
  },
};

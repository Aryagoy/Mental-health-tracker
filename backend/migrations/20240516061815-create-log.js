'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      mood: {
        type: Sequelize.INTEGER
      },
      anxiety: {
        type: Sequelize.INTEGER
      },
      sleep: {
        type: Sequelize.FLOAT
      },
      physicalActivity: {
        type: Sequelize.STRING
      },
      physicalActivityExcercise:{
        type: Sequelize.STRING
      },
      socialInteractions: {
        type: Sequelize.STRING
      },
      stress: {
        type: Sequelize.INTEGER
      },
      symptoms: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Logs');
  }
};
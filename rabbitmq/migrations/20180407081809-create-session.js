'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.STRING
      },
      task: {
        type: Sequelize.STRING(1024)
      },
      task_md5: {
        type: Sequelize.UUID
      },
      task_queue: {
        type: Sequelize.STRING
      },
      event: {
        type: Sequelize.STRING(1024)
      },
      event_md5: {
        type: Sequelize.UUID
      },
      event_queue: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Sessions');
  }
};

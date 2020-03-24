"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("restaurants", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      row_guid: {
        type: Sequelize.UUID
      },
      restaurant_name: {
        type: Sequelize.STRING,
        unique: true
      },
      restaurant_description: {
        type: Sequelize.STRING
      },
      menu_id: {
        type: Sequelize.INTEGER
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("restaurants");
  }
};

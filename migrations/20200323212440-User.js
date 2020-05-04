"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      row_guid: {
        type: Sequelize.UUID,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      surname: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
      },
      row_created_date: {
        type: Sequelize.DATE,
      },
      row_updated_date: {
        type: Sequelize.DATE,
      },
      birth_date: {
        type: Sequelize.DATE,
      },
      role_type: {
        type: Sequelize.DATE,
      },
      is_first_login: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  },
};

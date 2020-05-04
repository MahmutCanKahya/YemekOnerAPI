import Sequelize from "sequelize";
import sequelize from "../database/database";

const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    row_guid: {
      type: Sequelize.UUIDV4,
    },
    email: {
      type: Sequelize.STRING,
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
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);

export default User;

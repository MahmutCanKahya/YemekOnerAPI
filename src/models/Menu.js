import Sequelize from "sequelize";
import sequelize from "../database/database";

const Menu = sequelize.define(
  "menus",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    meal_name: {
      type: Sequelize.STRING,
      unique: true
    }
  },
  {
    timestamps: false
  }
);

export default Menu;

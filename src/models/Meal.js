import Sequelize from "sequelize";
import sequelize from "../database/database";

const Meal = sequelize.define(
  "meals",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    meal_name: {
      type: Sequelize.STRING,
      unique: true,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    restaurant_id: {
      type: Sequelize.INTEGER,
    },
    meal_image: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default Meal;

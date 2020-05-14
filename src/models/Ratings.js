import Sequelize from "sequelize";
import sequelize from "../database/database";

const Ratings = sequelize.define(
  "ratings",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: Sequelize.INTEGER,
    },
    meal_id: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.STRING,
    },
    row_created_date: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: false,
  }
);

export default Ratings;

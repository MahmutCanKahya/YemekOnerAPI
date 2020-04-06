import Sequelize from "sequelize";
import sequelize from "../database/database";

const Ratings = sequelize.define(
  "ratings",
  {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      count: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.INTEGER
      },
      meal_name: {
        type: Sequelize.STRING,
      },
      restaurant_name: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      }
  },
  {
    timestamps: false
  }
);

export default Ratings;

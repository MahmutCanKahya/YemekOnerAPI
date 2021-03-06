import Sequelize from "sequelize";
import sequelize from "../database/database";

const Restaurant = sequelize.define(
  "restaurants",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    row_guid: {
      type: Sequelize.UUID,
    },
    restaurant_image: {
      type: Sequelize.STRING,
    },
    restaurant_name: {
      type: Sequelize.STRING,
      unique: true,
    },
    restaurant_description: {
      type: Sequelize.STRING,
    },
    menu_id: {
      type: Sequelize.INTEGER,
    },
    long:{
      type: Sequelize.DECIMAL(10,7)
    },
    lat:{
      type: Sequelize.DECIMAL(10,7)
    }
  },
  {
    timestamps: false,
  }
);

export default Restaurant;

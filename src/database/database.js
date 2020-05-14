import Sequelize from "sequelize";
//mahmut7716
const sequelize = new Sequelize("yemekoner", "admin", "774516", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000,
  },
});

const sequelizeProd = new Sequelize("yemekoner", "admin", "774516", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000,
  }
});

module.exports = sequelize;
global.sequelize = sequelize;

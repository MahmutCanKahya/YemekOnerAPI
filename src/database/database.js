import Sequelize from "sequelize";

const sequelize= new Sequelize("yemekoner", "postgres", "mahmut7716", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000
  }
});

const sequelizeProd = new Sequelize("yemekoner", "admin", "774516", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000
  }
});

module.exports=sequelize;
global.sequelize=sequelize

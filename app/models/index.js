const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config.js")[env];

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
     host: dbConfig.HOST,
     dialect: dbConfig.dialect,
     operatorAliases: false,
     pool: {
          max: dbConfig.pool.max,
          min: dbConfig.pool.min,
          acquire: dbConfig.pool.acquire,
          idle: dbConfig.pool.idle
     }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Penduduk = require("./penduduk/penduduk.model.js")(sequelize, Sequelize);
db.Dusun = require('./dusun/dusun.model.js')(sequelize, Sequelize);
module.exports = db;

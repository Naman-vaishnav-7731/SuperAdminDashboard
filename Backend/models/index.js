const DB = require("../Config/DB");
const Sequelize = require("sequelize");

// crate connection from database
const sequelize = new Sequelize(DB.DB, DB.USER, DB.PASSWORD, {
  host: DB.HOST,
  dialect: DB.dialect,

  pool: {
    max: DB.pool.max,
    min: DB.pool.min,
    acquire: DB.pool.acquire,
    idle: DB.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("./Users")(sequelize , Sequelize.DataTypes);

db.sequelize.sync({ force: false })
.then(() => {
    console.log("re sync is done");
})

module.exports = db;

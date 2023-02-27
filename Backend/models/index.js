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

// user and image for store user profile
db.users = require("./Users")(sequelize , Sequelize.DataTypes);
// db.images = require("./Images")(sequelize , Sequelize.DataTypes);


db.sequelize.sync({ force: false })
.then(() => {
    console.log("re sync is done");
})

// // define one to one relationship
// db.users.hasOne(db.images , {
//   foreignKey: 'email', 
//   as:'image',
//   onDelete: 'CASCADE',
//   onUpdate:'CASCADE'
// });

// // images table belongs to users table
// db.images.belongsTo(db.users , {
//    foreignKey: 'email', 
//    as:'Users',
//    onDelete: 'CASCADE',
//    onUpdate:'CASCADE'
// });

module.exports = db;

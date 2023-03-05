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

//@Admin Model | Super Admin Model
db.admin = require('./Admin/Admin')(sequelize , Sequelize.DataTypes);

//@Role Model | Store all Role for Ecommerce Store
db.role = require('./Role/Role')(sequelize , Sequelize.DataTypes);

//@Rule Model | Store all Rules for Ecommerce Store
db.rule = require('./Rule/Rule')(sequelize , Sequelize.DataTypes);

//@Permission Model | Store all Permissions for Ecommerce Store
db.permission = require('./Permission/Permission')(sequelize , Sequelize.DataTypes);

//@user Model | Store all Role Based Users
db.user = require('./User/User')(sequelize , Sequelize.DataTypes);

// Establish Relation Between Role and User Schema 
// one to Many Relationship | Role can have multiple Users  
db.role.hasMany(db.user);
db.user.belongsTo(db.role);

// Establish Relation 
db.user.belongsToMany(db.permission, { through: 'UserPermission' });
db.permission.belongsToMany(db.user, { through: 'UserPermission' });

db.permission.belongsToMany(db.rule, { through: 'PermissionRule' });
db.rule.belongsToMany(db.permission, { through: 'PermissionRule' });


db.sequelize.sync({ force: false })
.then(() => {
    console.log("re sync is done");
})

module.exports = db;

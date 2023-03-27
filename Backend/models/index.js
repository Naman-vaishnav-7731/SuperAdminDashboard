const DB = require("../Config/DB");
const Sequelize = require("sequelize");
const {DataTypes} = require("sequelize");

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
db.users = require("./Users")(sequelize, Sequelize.DataTypes);

//@Admin Model | Super Admin Model
db.admin = require("./Admin/Admin")(sequelize, Sequelize.DataTypes);

//@Role Model | Store all Role for Ecommerce Store
db.role = require("./Role/Role")(sequelize, Sequelize.DataTypes);

//@Rule Model | Store all Rules for Ecommerce Store
db.rule = require("./Rule/Rule")(sequelize, Sequelize.DataTypes);

//@Permission Model | Store all Permissions for Ecommerce Store
db.permission = require("./Permission/Permission")(
  sequelize,
  Sequelize.DataTypes
);

//@user Model | Store all Role Based Users
db.user = require("./User/User")(sequelize, Sequelize.DataTypes);



//Product and Variants
//---------------------------------------------------------------------------------------------
db.product = require("./Product/Products")(sequelize, Sequelize.DataTypes);
db.variant = require("./Product/Variants/Variants")(
  sequelize,
  Sequelize.DataTypes
);
db.attribute = require("./Product/Attribute/Attribute")(
  sequelize,
  Sequelize.DataTypes
);
db.variantImage = require("./Product/Img/Image")(
  sequelize,
  Sequelize.DataTypes
);

// Define the association between Variant and VariantImage models
db.variant.hasMany(db.variantImage);
db.variantImage.belongsTo(db.variant);

// Define the association between Product and Attribute models
db.product.hasMany(db.attribute);
db.attribute.belongsTo(db.product);

// Define the association between Product and SKU models
db.product.hasMany(db.variant);
db.variant.belongsTo(db.product);

// Define the association between Attribute and SKU models
const AttributeSKU = sequelize.define("attribute_sku", {
  value: {
    type: Sequelize.STRING,
    allowNull: false,
    comment:
      "The value for this SKU and attribute combination, i.e. Small, Red, etc.",
  },
});

db.attribute.belongsToMany(db.variant, { through: AttributeSKU });
db.variant.belongsToMany(db.attribute, { through: AttributeSKU });

//--------------------------------------------------------------------------------------------

// Establish Relation Between Role and User Schema
// one to Many Relationship | Role can have multiple Users
// db.role.hasMany(db.user);
// db.user.belongsTo(db.role);

// const PermissionRule = sequelize.define(
//   "PermissionRule",
//   {},
//   {
//     freezeTableName: true,
//   }
// );


// db.permission.create({
//   Permission_code:1,
//   Permission_name:"Read"
// });


//--------------------------------Permission and Rules--------------------------------------------------

// RelationShip Between Permission and Rule
// Through Permission_Rule 
const Permission_Rule = sequelize.define('Permission_Rule' , {
   id:{
    type:DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
   }},{
    freezeTableName: true
});

db.permission.belongsToMany(db.rule , {through:Permission_Rule});
db.rule.belongsToMany(db.permission , {through:Permission_Rule});

db.Permission_Rule = Permission_Rule;

//-----------------------------User and Permission--------------------------------------------------------

// Many to Many Relation Between  Permission_Rule and User

const User_Permission = sequelize.define('User_Permission' , {
  id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  }},{
    freezeTableName: true
  }
);

db.User_Permission = User_Permission;

Permission_Rule.belongsToMany(db.user , {through:User_Permission});
db.user.belongsToMany(Permission_Rule , {through:User_Permission});

//------------------------------------------------------------------------------------------

db.sequelize.sync({ force: false }).then(() => {
  console.log("re sync is done");
});

module.exports = db;

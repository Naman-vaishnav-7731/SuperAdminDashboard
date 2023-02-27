module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("image", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
    },
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.BLOB("long"),
    },
  });

  return Image;
};

module.exports = (sequelize, DataTypes) => {
    const Variant = sequelize.define('Variant', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        sku: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: 'The actual alpha-numeric SKU code'
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
        compare_price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true
        }
      },
      {
        freezeTableName: true,
      }
    );
  
    return Variant;
  };
  
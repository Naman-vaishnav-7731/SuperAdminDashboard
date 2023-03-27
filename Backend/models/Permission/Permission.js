module.exports = ( sequelize , DataTypes ) => {
    const Permission = sequelize.define('Permission', {
        Permission_code:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        Permission_name:{
            type: DataTypes.STRING,
            allowNull: false,
            
        },
    },{
        freezeTableName: true
    });

    return Permission;
}

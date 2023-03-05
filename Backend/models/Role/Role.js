module.exports = ( sequelize , DataTypes ) => {
    const Role = sequelize.define('Role', {
        Role_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Role_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        freezeTableName: true
    });

    return Role;
}

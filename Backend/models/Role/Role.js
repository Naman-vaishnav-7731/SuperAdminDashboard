module.exports = ( sequelize , DataTypes ) => {
    const Role = sequelize.define('Role', {
        Role_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        Role_name:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
    },{
        freezeTableName: true
    });

    return Role;
}

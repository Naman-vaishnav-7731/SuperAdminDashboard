module.exports = ( sequelize , DataTypes ) => {
    const Admin = sequelize.define('Admin', {
        admin_name:{
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        admin_email:{
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },{
        freezeTableName: true
    });

    return Admin;
}

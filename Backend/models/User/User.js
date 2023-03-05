// Implement User Model
module.exports = ( sequelize , DataTypes ) => {
    const user = sequelize.define('user', {
        user_email:{
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

    return user;
}

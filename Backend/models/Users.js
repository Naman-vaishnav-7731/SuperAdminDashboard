module.exports = ( sequelize , DataTypes ) => {
    const Users = sequelize.define('Users', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,   
            unique: true,
            allowNull: false
        },
        fname:{
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lname:{
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type:DataTypes.STRING(10),
            allowNull: false
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false
        },
        pincode : {
            type: DataTypes.STRING(6),
            allowNull: false
        },
        userType: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: 'user'
          },
        
    },{
        freezeTableName: true
    });

    return Users;
}




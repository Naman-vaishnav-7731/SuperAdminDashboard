module.exports = ( sequelize , DataTypes ) => {
    const Rule = sequelize.define('Rule', {
        Rule_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Rule_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        freezeTableName: true
    });

    return Rule;
}

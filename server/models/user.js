module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING(80),
            allowNull: false,
            unique: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        image: DataTypes.BLOB
    },
    { freezeTableName: true, tableName: 'user' });
    
    return User;
};

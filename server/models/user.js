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
        image: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        isSupport: {
            type: DataTypes.BOOL,
            allowNull: false,
        }
    },
    { freezeTableName: true, tableName: 'user' });
    
    return User;
};

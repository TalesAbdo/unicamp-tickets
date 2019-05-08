module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        commentText: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        }
    });

    return User;
};

module.exports = function (sequelize, DataTypes) {
    const SupportUser = sequelize.define('SupportUser', {
        isAdmin: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    return SupportUser;
};

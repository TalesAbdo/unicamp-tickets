module.exports = function (sequelize, DataTypes) {
    const SupportUser = sequelize.define('SupportUser', {
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    },
    { freezeTableName: true, tableName: 'supportuser', timestamps: false });

    return SupportUser;
};

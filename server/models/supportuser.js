module.exports = function (sequelize, DataTypes) {
    const SupportUser = sequelize.define('SupportUser', {
    },
    { freezeTableName: true, tableName: 'supportuser', timestamps: false });

    return SupportUser;
};

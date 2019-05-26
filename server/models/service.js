module.exports = function (sequelize, DataTypes) {
    const Service = sequelize.define('Service', {
        name: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: true
        }
    },
    { freezeTableName: true, tableName: 'service', timestamps: false });

    return Service;
};

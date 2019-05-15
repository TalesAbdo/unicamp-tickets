module.exports = function (sequelize, DataTypes) {
    const Service = sequelize.define('Service', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Service;
};

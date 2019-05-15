module.exports = function (sequelize, DataTypes) {
    const Ticket = sequelize.define('Ticket', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        severityId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        statusId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.MEDIUMTEXT,
            allowNull: false
        },
    });

    return Ticket;
};

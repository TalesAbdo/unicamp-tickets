module.exports = function (sequelize, DataTypes) {
    const Ticket = sequelize.define('Ticket', {
        title: {
            type: DataTypes.STRING(100),
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
            type: DataTypes.STRING(3000),
            allowNull: false
        },
    },
    { freezeTableName: true, tableName: 'ticket' });

    return Ticket;
};

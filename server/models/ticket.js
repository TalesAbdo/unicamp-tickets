module.exports = function (sequelize, DataTypes) {
    const Ticket = sequelize.define('Ticket', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: DataTypes.BLOB
    });

    return Ticket;
};

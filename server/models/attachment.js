module.exports = function (sequelize, DataTypes) {
    const Attachment = sequelize.define('Attachment', {
        path: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
    },
    { freezeTableName: true, tableName: 'attachment', timestamps: false });

    return Attachment;
};

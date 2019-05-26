module.exports = function (sequelize, DataTypes) {
    const Attachment = sequelize.define('Attachment', {
        archive: {
            type: DataTypes.BLOB,
            allowNull: false
        },
    },
    { freezeTableName: true, tableName: 'attachment', timestamps: false });

    return Attachment;
};

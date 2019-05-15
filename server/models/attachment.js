module.exports = function (sequelize, DataTypes) {
    const Attachment = sequelize.define('Attachment', {
        archive: {
            type: DataTypes.BLOB,
            allowNull: false
        },
    });

    return Attachment;
};

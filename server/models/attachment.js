module.exports = function (sequelize, DataTypes) {
    const Attachment = sequelize.define('Attachment', {
        path: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'Nome do arquivo deve ter no máximo 100 caracteres.'
                },
                notNull: {
                    msg: 'Insira um nome para o arquivo.'
                },
            }
        },
    },
    { freezeTableName: true, tableName: 'attachment', timestamps: false });

    return Attachment;
};

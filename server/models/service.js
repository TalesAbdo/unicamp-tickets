module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                len: {
                    args: [3, 60],
                    msg: 'Por favor, insira um nome com no mínimo 3 e no máximo 60 caracteres.'
                },
                notNull: {
                    msg: 'Por favor, insira um nome com no mínimo 3 e no máximo 60 caracteres.'
                }
            }
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: true,
            validate: {
                len: {
                    args: [3, 200],
                    msg: 'Por favor, insira uma descrição com no mínimo 3 e no máximo 200 caracteres.'
                },
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    { freezeTableName: true, tableName: 'service', timestamps: false });

    return Service;
};

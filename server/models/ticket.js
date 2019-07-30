module.exports = function (sequelize, DataTypes) {
    const Ticket = sequelize.define('Ticket', {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [3, 100],
                    msg: 'Por favor, insira um título com pelo menos 3 e no máximo 100 caracteres.'
                },
                notNull: {
                    msg: 'Insira um título.'
                },
            }
        },
        severityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Escolha uma severidade.'
                },
            }
        },
        serviceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Escolha um produto.'
                },
            }
        },
        statusId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(3000),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 3000],
                    msg: 'Por favor, insira uma descrição com no máximo 3000 caracteres.'
                },
                notNull: {
                    msg: 'Por favor, insira uma descrição com no máximo 3000 caracteres.'
                },
            }
        },
    },
    { freezeTableName: true, tableName: 'ticket' });

    return Ticket;
};

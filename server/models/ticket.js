module.exports = function (sequelize, DataTypes) {
    const Ticket = sequelize.define('Ticket', {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [3, 100],
                    msg: ['Por favor, insira um título com pelo menos 3 e no máximo 100 caracteres.']
                }
            }
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
            allowNull: false,
            validate: {
                len: {
                    args: [0, 3000],
                    msg: ['Por favor, insira uma descrição com no máximo 3000 caracteres.']
                }
            }
        },
    },
    { freezeTableName: true, tableName: 'ticket' });

    return Ticket;
};

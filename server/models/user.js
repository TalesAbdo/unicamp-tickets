module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING(80),
            allowNull: false,
            unique: false,
            validate: {
                len: {
                    args: [3, 80],
                    msg: ['Por favor, insira um nome com pelo menos 3 e no máximo 80 caracteres.']
                },
                notNull: {
                    msg: 'Insira um nome.'
                },
                not: {
                    args: ["[\'\"\!\^\?\(\)\[\]]", 'i'], // eslint-disable-line
                    msg: 'Insira um nome válido sem caracteres especiais.'
                }
            }
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: ['Insira um email válido.']
                },
                len: {
                    args: [3, 50],
                    msg: 'Por favor, insira um email com no mínimo 3 e no máximo 50 caracteres.'
                },
                notNull: {
                    msg: 'Insira um email.'
                },
                not: {
                    args: ["[\'\"\!\^\?\(\)\[\]]", 'i'], // eslint-disable-line
                    msg: 'Insira um email válido.'
                }
            }
        },
        password: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                len: {
                    args: [5, 20],
                    msg: 'Por favor, insira uma senha com no mínimo 5 e no máximo 20 caracteres.'
                },
                notNull: {
                    msg: 'Insira uma senha.'
                },
                not: {
                    args: ["[\'\"]", 'i'], // eslint-disable-line
                    msg: 'Aspas não são aceitas na senha.'
                }
            }
        },
        isSupport: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    { freezeTableName: true, tableName: 'user', timestamps: false });

    return User;
};

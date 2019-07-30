module.exports = function (sequelize, DataTypes) {
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
                is: {
                    args: [/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/],
                    msg: 'Apenas letras são permitidas no nome.'
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
                    msg: 'Por favor, insira um email com no máximo 50 caracteres.'
                },
                notNull: {
                    msg: 'Insira um email.'
                },
                not: {
                    args: ["[\'\"\!\^\?\(\)\[\]]",'i'], 
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
                    args: ["[\'\"]",'i'], 
                    msg: 'Aspas não são aceitas na senha.'
                }
            }
        },
        image: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        isSupport: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    { freezeTableName: true, tableName: 'user' });
    
    return User;
};

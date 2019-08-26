module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        commentText: {
            type: DataTypes.STRING(300),
            allowNull: false,
            validate: {
                len: {
                    args: [1, 300],
                    msg: 'Por favor, insira um comentário com no máximo 300 caracteres.'
                },
                notNull: {
                    msg: 'Por favor, insira um comentário com no máximo 300 caracteres.'
                }
            }
        }
    },
    { freezeTableName: true, tableName: 'comment' });
    return Comment;
};

module.exports = function (sequelize, DataTypes) {
    const Comment = sequelize.define('Comment', {
        commentText: {
            type: DataTypes.STRING(300),
            allowNull: false
        }
    },
    { freezeTableName: true, tableName: 'comment' });
    return Comment;
};

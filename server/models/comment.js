module.exports = function (sequelize, DataTypes) {
    const Comment = sequelize.define('Comment', {
        commentText: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Comment;
};

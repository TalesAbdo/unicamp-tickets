const db = require('../../models/index.js');

async function insertComment(params) {
    try {
        return db.Comment.create({
            ticketId: params.ticketId,
            userId: params.userId,
            commentText: params.commentText
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function getCommentsByTicket(ticketId) {
    try {
        return db.sequelize.query(
            `SELECT c.id, c.commentText, c.createdAt, u.name as userName from comment c
             inner join user u on u.id = c.userId
             where c.ticketId = ${ticketId}
             order by id desc`,
            { type: db.sequelize.QueryTypes.SELECT }
        ).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

module.exports = {
    insertComment,
    getCommentsByTicket
};

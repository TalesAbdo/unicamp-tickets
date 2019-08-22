const comment = require('./comment.model.js');

async function insertComment(req, res) {
    try {
        const result = await comment.insertComment(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function getCommentsByTicket(req, res) {
    try {
        const result = await comment.getCommentsByTicket(req.params.ticketid);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

module.exports = {
    insertComment,
    getCommentsByTicket
};

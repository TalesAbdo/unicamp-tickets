const attachment = require('./attachment.model.js');

async function insertAttachment(req, res) {
    try {
        const result = await attachment.insertAttachment(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function getAttachments(req, res) {
    try {
        const result = await attachment.getAttachments(req.params.ticketId);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

module.exports = {
    insertAttachment,
    getAttachments
};

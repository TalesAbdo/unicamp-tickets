const attachment = require('./attachment.model.js');

async function getAttachments(req, res) {
    try {
        const result = await attachment.getAttachments(req.params.id);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function getAttachment(req, res) {
    try {
        const result = await attachment.getAttachment(req.params.path);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

module.exports = {
    getAttachments,
    getAttachment
};

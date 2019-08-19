const db = require('../../models/index.js');

async function insertAttachment(params) {
    try {
        return db.Attachment.create({
            path: params.path,
            name: params.name
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function getAttachments(ticketId) {
    try {
        return db.Attachment.find({
            where: {
                ticketId: ticketId
            }
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

module.exports = {
    insertAttachment,
    getAttachments
};

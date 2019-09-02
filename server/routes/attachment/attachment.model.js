const fs = require('fs');
const db = require('../../models/index.js');

function insertAttachments(files, ticketId) {
    try {
        files.map(async (file) => {
            // const base64Data = file.fileContent.replace(/^data:.*;base64,/, '');
            await fs.writeFileSync(`server/files/attachments/${file.pathName}`, file.fileContent, () => {
                console.log('The file was saved!');
            });
            await db.Attachment.create({
                path: file.pathName,
                name: file.realName,
                ticketId
            }).then(result => result).catch(err => err);
        });
        return true;
    } catch (error) {
        return error;
    }
}

async function getAttachments(ticketId) {
    try {
        return db.sequelize.query(
            `select * from attachment
            where ticketId = ${ticketId}`,
            { type: db.sequelize.QueryTypes.SELECT }
        ).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function getAttachment(path) {
    try {
        return fs.readFileSync(`server/files/attachments/${path}`, 'utf8');
    } catch (error) {
        return error;
    }
}

module.exports = {
    insertAttachments,
    getAttachments,
    getAttachment
};

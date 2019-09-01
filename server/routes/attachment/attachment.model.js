const fs = require('fs');
const db = require('../../models/index.js');

function insertAttachments(files, ticketId) {
    try {
        files.map(async (file) => {
            const base64Data = file.fileContent.replace(/^data:.*;base64,/, '');
            console.log(base64Data);
            await fs.writeFileSync(`dist/img/${file.pathName}`, base64Data, 'base64', () => {
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
        return db.Attachment.find({
            where: {
                ticketId
            }
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

module.exports = {
    insertAttachments,
    getAttachments
};

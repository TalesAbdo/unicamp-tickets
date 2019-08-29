const db = require('../../models/index.js');

function insertAttachments(files) {
    try {
        files.map(async (file) => {
            await fs.writeFileSync(`dist/img/${file.pathName}.${file.extension}`, file., 'base64', () => {
                console.log('The file was saved!');
            });
            return db.Attachment.create({
                path: file.pathName,
                name: file.realName,
                extension: file.extension
            }).then(result => result).catch(err => err);
        });
    } catch (error) {
        return error;
    }
}


async function insertUserImage(params) {
    try {
        const base64Data = params.image.replace(/^data:image\/.*;base64,/, '');
        await fs.writeFileSync(`dist/img/${params.email}.jpg`, base64Data, 'base64', () => {
            console.log('The file was saved!');
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
                ticketId: ticketId
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

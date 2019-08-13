const db = require('../../models/index.js');

async function insertService(params) {
    try {
        return db.Service.create({
            name: params.name,
            description: params.description,
            isActive: params.isActive
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function updateService(params) {
    try {
        return db.Service.update({
            name: params.name,
            description: params.description
        }, {
            where: {
                id: params.id
            }
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function archiveService(params) {
    try {
        return db.Service.update({
            isActive: params.isActive
        }, {
            where: {
                id: params.id
            }
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function getService(serviceId) {
    try {
        return db.Service.findOne({
            where: {
                id: serviceId
            }
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function getServices() {
    try {
        return db.Service.findAll({}).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function getActiveServices() {
    try {
        return db.Service.findAll({
            where: {
                isActive: 1
            }
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

module.exports = {
    insertService,
    updateService,
    archiveService,
    getService,
    getServices,
    getActiveServices
};

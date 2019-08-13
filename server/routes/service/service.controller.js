const service = require('./service.model.js');

async function insertService(req, res) {
    try {
        const result = await service.insertService(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function updateService(req, res) {
    try {
        const result = await service.updateService(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function archiveService(req, res) {
    try {
        const result = await service.archiveService(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function getService(req, res) {
    try {
        const result = await service.getService(req.params.id);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function getServices(req, res) {
    try {
        const result = await service.getServices();
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function getActiveServices(req, res) {
    try {
        const result = await service.getActiveServices();
        res.json(result);
    } catch (err) {
        res.json(err);
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

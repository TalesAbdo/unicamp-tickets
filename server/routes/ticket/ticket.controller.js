const ticket = require('./ticket.model.js');
const attachment = require('../attachment/attachment.model.js');

async function insertTicket(req, res) {
    try {
        await attachment.insertAttachments(req.body.files);
        const result = await ticket.insertTicket(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function updateTicketAssigned(req, res) {
    try {
        const result = await ticket.updateTicketAssigned(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function updateTicketService(req, res) {
    try {
        const result = await ticket.updateTicketService(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function updateTicketSeverity(req, res) {
    try {
        const result = await ticket.updateTicketSeverity(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function updateTicketStatus(req, res) {
    try {
        const result = await ticket.updateTicketStatus(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function getTicket(req, res) {
    try {
        const result = await ticket.getTicket(req.params.id);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function getTicketsByUser(req, res) {
    try {
        const result = await ticket.getTicketsByUser(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function getYearsWithTickets(req, res) {
    try {
        const result = await ticket.getYearsWithTickets();
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function getTicketsByStatus(req, res) {
    try {
        const result = await ticket.getTicketsByStatus();
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function getTicketsByMonthYear(req, res) {
    try {
        const result = await ticket.getTicketsByMonthYear(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function getTicketsByClosingTime(req, res) {
    try {
        const result = await ticket.getTicketsByClosingTime(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function getTicketsRelatory(req, res) {
    try {
        const result = await ticket.getTicketsRelatory(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

module.exports = {
    insertTicket,
    updateTicketAssigned,
    updateTicketService,
    updateTicketSeverity,
    updateTicketStatus,
    getTicket,
    getTicketsByUser,
    getYearsWithTickets,
    getTicketsByStatus,
    getTicketsByMonthYear,
    getTicketsByClosingTime,
    getTicketsRelatory
};

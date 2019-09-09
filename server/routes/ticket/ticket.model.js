const db = require('../../models/index.js');

async function insertTicket(params) {
    try {
        return db.Ticket.create({
            assignedId: null, // All tickets start without assigned
            ownerId: params.ownerId,
            serviceId: params.serviceId,
            title: params.title,
            description: params.description,
            severityId: params.severityId,
            statusId: 1, // All tickets start open
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function updateTicketAssigned(params) {
    try {
        return db.Ticket.update({
            assignedId: params.assignedId
        }, {
            where: {
                id: params.ticketId
            }
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function updateTicketService(params) {
    try {
        return db.Ticket.update({
            serviceId: params.serviceId
        }, {
            where: {
                id: params.ticketId
            }
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function updateTicketSeverity(params) {
    try {
        return db.Ticket.update({
            severityId: params.severityId
        }, {
            where: {
                id: params.ticketId
            }
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function updateTicketStatus(params) {
    try {
        return db.Ticket.update({
            statusId: params.statusId
        }, {
            where: {
                id: params.ticketId
            }
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function getTicket(ticketId) {
    try {
        return db.sequelize.query(
            `select t.*, au.name as assignedName, au.email as assignedEmail, ou.name as ownerName, ou.email as ownerEmail, s.name as serviceName from ticket t
            left join user au on au.id = t.assignedId
            inner join user ou on ou.id = t.ownerId
            inner join service s on s.id = t.serviceId
            where t.id = ${ticketId}`,
            { type: db.sequelize.QueryTypes.SELECT }
        ).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function getTicketsByUser(params) {
    try {
        let ownerQuery = '';
        if (params.ownerId) {
            ownerQuery = `and ownerId = ${params.ownerId}`;
        }
        return db.sequelize.query(
            `select t.id, t.title, t.severityId, t.statusId, t.createdAt, au.name as assignedName, au.email as assignedEmail from ticket t
            left join user au on au.id = t.assignedId
            where statusId in (${params.statusList.join(',')})
            and severityId in (${params.severityList.join(',')})
            ${params.dateQuery}
            ${ownerQuery}
            order by createdAt desc
            ${params.fetchQuery}`,
            { type: db.sequelize.QueryTypes.SELECT }
        ).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function getYearsWithTickets() {
    try {
        return db.sequelize.query(
            'SELECT YEAR(createdAt) YEAR FROM ticket GROUP BY YEAR(createdAt);',
            { type: db.sequelize.QueryTypes.SELECT }
        ).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function getTicketsByStatus() {
    try {
        return db.sequelize.query(
            'select statusId, count(*) as quantity from ticket group by statusId',
            { type: db.sequelize.QueryTypes.SELECT }
        ).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function getTicketsByMonthYear(params) {
    try {
        let serviceQuery = '';
        if (params.serviceId) {
            serviceQuery = `AND serviceId = ${params.serviceId}`;
        }
        return db.sequelize.query(
            `SELECT MONTHNAME(createdAt) MONTH, COUNT(*) VALUE FROM TICKET
            WHERE (MONTH(createdAt) >= '${params.initialMonth}' AND MONTH(createdAt) <= '${params.finalMonth}')
            AND YEAR(createdAt) = '${params.year}'
            ${serviceQuery}
            GROUP BY MONTH(createdAt);`,
            { type: db.sequelize.QueryTypes.SELECT }
        ).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function getTicketsByClosingTime(params) {
    try {
        let serviceQuery = '';
        if (params.serviceId) {
            serviceQuery = `AND serviceId = ${params.serviceId}`;
        }
        return db.sequelize.query(
            `SELECT MONTHNAME(createdAt) MONTH, AVG(DATEDIFF(updatedAt, createdAt)) VALUE FROM TICKET
            WHERE (MONTH(createdAt) >= '${params.initialMonth}' AND MONTH(createdAt) <= '${params.finalMonth}')
            AND YEAR(createdAt) = '${params.year}'
            ${serviceQuery}
            GROUP BY MONTH(createdAt);`,
            { type: db.sequelize.QueryTypes.SELECT }
        ).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function getTicketsRelatory(params) {
    try {
        let serviceQuery = '';
        let severityQuery = '';
        if (params.serviceId) {
            serviceQuery = `AND t.serviceId = ${params.serviceId}`;
        }
        if (params.severityId) {
            severityQuery = `AND t.severityId = ${params.severityId}`;
        }
        return db.sequelize.query(
            `select t.id, t.severityId severityId, t.STATUSID statusId, t.title, t.description,
            t.createdAt as created, t.updatedAt updated, s.name as serviceName, ou.name ownerName, su.name assignedName FROM TICKET t
            left join SERVICE s on t.serviceId = s.id
            left join USER ou on t.ownerId = ou.id
            left join USER su on t.assignedId = su.id
            WHERE ((t.createdAt) >= '${params.initialDate}' AND (t.createdAt) <= '${params.finalDate}')
            ${serviceQuery}
            ${severityQuery}`,
            { type: db.sequelize.QueryTypes.SELECT }
        ).then(result => result).catch(err => err);
    } catch (error) {
        return error;
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

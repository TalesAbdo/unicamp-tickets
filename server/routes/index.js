const express = require('express');

const router = express.Router();

const user = require('./user/user.controller');
const comment = require('./comment/comment.controller');
const service = require('./service/service.controller');
const ticket = require('./ticket/ticket.controller');
const attachment = require('./attachment/attachment.controller');

// User
router.post('/user/new', user.insertUser);
router.post('/user/image', user.insertUserImage);
router.put('/user/update', user.updateUser);
router.delete('/user/delete/:id', user.deleteUser);
router.post('/user/search', user.searchUsers);
router.post('/user/authenticate', user.authenticateUser);

// Support User
router.put('/user/support/new/:id', user.insertSupportUser);
router.delete('/user/support/delete/:id', user.deleteSupportUser);
router.get('/user/support/all', user.getSupportUsers);

// Comment
router.post('/comment/new', comment.insertComment);
router.get('/comment/all/:ticketid', comment.getCommentsByTicket);

// Service
router.post('/service/new', service.insertService);
router.put('/service/update', service.updateService);
router.put('/service/archive', service.archiveService);
router.get('/service/all', service.getServices);
router.get('/service/all/active', service.getActiveServices);
router.get('/service/:id', service.getService);

// Ticket
router.post('/ticket/new', ticket.insertTicket);
router.put('/ticket/update/assigned', ticket.updateTicketAssigned);
router.put('/ticket/update/service', ticket.updateTicketService);
router.put('/ticket/update/severity', ticket.updateTicketSeverity);
router.put('/ticket/update/status', ticket.updateTicketStatus);
router.get('/ticket/id/:id', ticket.getTicket);
router.post('/ticket/user', ticket.getTicketsByUser);
router.get('/ticket/year', ticket.getYearsWithTickets);
router.get('/ticket/bystatus', ticket.getTicketsByStatus);
router.post('/ticket/byamount', ticket.getTicketsByMonthYear);
router.post('/ticket/byclosingtime', ticket.getTicketsByClosingTime);
router.post('/ticket/relatory', ticket.getTicketsRelatory);

// Attachments
router.get('/attachment/ticket/:id', attachment.getAttachments);
router.get('/attachment/:path', attachment.getAttachment);

module.exports = router;

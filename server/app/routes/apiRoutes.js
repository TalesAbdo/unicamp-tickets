
module.exports = function (app, db) {
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;

    app.get('/api/ticket/byuser', (req, res) => {
        db.Ticket.findAll({
            where: {
                userId: req.body.userId,   
                createdAt: {
                    [Op.between]: [req.body.initialDate, req.body.finalDate],  
                },
                severityId: req.body.severityIdList,
                statusId: req.body.statusIdList,
                serviceId: req.body.serviceIdList
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.get('/api/ticket/search/:id', (req, res) => {
        db.Ticket.findOne({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.get('/api/ticket/year', (req, res) => {
        db.sequelize.query(
            'SELECT YEAR(createdAt) YEAR FROM TICKET GROUP BY YEAR(createdAt);',
            {type: db.sequelize.QueryTypes.SELECT}
          ).then((result) => {
            res.json(result);
        });
    });

    app.get('/api/ticket/bystatus', (req, res) => {
        db.sequelize.query(
            'select statusId, count(*) as quantity from ticket group by statusId',
            {type: db.sequelize.QueryTypes.SELECT}
          ).then((result) => {
            res.json(result);
        });
    });

    // Queries with join are made with raw query because are simpler to understand and modify
    app.post('/api/ticket/byamount', (req, res) => {
        let serviceQuery = ''
        if(req.body.serviceId) {
            serviceQuery = `AND serviceId = ${req.body.serviceId}`
        }
        db.sequelize.query(
            `SELECT MONTHNAME(createdAt) MONTH, COUNT(*) VALUE FROM TICKET
            WHERE (MONTH(createdAt) >= '${req.body.initialMonth}' AND MONTH(createdAt) <= '${req.body.finalMonth}')
            AND YEAR(createdAt) = '${req.body.year}'
            ${serviceQuery}
            GROUP BY MONTH(createdAt);`,
            {type: db.sequelize.QueryTypes.SELECT}
            ).then((result) => {
            res.json([{MONTH: '1uuuu', VALUE: 23}, {MONTH: '1uuuu', VALUE: 70}, {MONTH: '1uuuu', VALUE: 56} ]);
        });
    });

    app.post('/api/ticket/byclosingtime', (req, res) => {
        let serviceQuery = ''
        if(req.body.serviceId) {
            serviceQuery = `AND serviceId = ${req.body.serviceId}`
        }
        db.sequelize.query(
            `SELECT MONTHNAME(createdAt) MONTH, AVG(DATEDIFF(updatedAt, createdAt)) VALUE FROM TICKET
            WHERE (MONTH(createdAt) >= '${req.body.initialMonth}' AND MONTH(createdAt) <= '${req.body.finalMonth}')
            AND YEAR(createdAt) = '${req.body.year}'
            ${serviceQuery}
            GROUP BY MONTH(createdAt);`,
            {type: db.sequelize.QueryTypes.SELECT}
            ).then((result) => {
            res.json(result);
        });
    });

    // This way was easier and more applicable. Also, it's a post so a body can be passed
    app.post('/api/ticket/byfilter', (req, res) => {
        let serviceQuery = '';
        let severityQuery = '';
        if (req.body.serviceId) {
            serviceQuery = `AND t.serviceId = ${req.body.serviceId}`
        }
        if (req.body.severityId) {
            severityQuery = `AND t.severityId = ${req.body.severityId}`
        }
        db.sequelize.query(
            `select t.id, t.severityId severityId, t.STATUSID statusId, t.title, t.description,
            t.createdAt as created, t.updatedAt updated, s.name as serviceName, ou.name ownerName, su.name assignedName FROM TICKET t
            left join SERVICE s on t.serviceId = s.id
            left join USER ou on t.ownerId = ou.id
            left join USER su on t.assignedId = su.id
            WHERE ((t.createdAt) >= '${req.body.initialDate}' AND (t.createdAt) <= '${req.body.finalDate}')
            ${serviceQuery}
            ${serviceQuery}`,
            {type: db.sequelize.QueryTypes.SELECT}
            ).then((result) => {
            res.json(result);
        });
    });
    
    app.post('/api/ticket/new', (req, res) => {
        db.Ticket.create({
            assignedId: req.body.assignedId,
            ownerId: req.body.ownerId,
            serviceId: req.body.serviceId,
            title: req.body.title,
            description: req.body.description,
            severityId: req.body.severityId,
            statusId: 1, // All tickets start open
        }).then((result) => {
            res.json(result);
        });
    });

    app.put('/api/ticket/update/assigned/:ticketid/:assignedid', (req, res) => {
        db.Ticket.update({
            assignedId: req.params.assignedId
        }, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.put('/api/ticket/update/owner/:ticketid/:ownerid', (req, res) => {
        db.Ticket.update({
            ownerId: req.params.ownerId
        }, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.put('/api/ticket/update/service/:ticketid/:serviceid', (req, res) => {
        db.Ticket.update({
            serviceId: req.params.serviceId
        }, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.put('/api/ticket/update/severity/:ticketid/:serviceid', (req, res) => {
        db.Ticket.update({
            severityId: req.params.severityId
        }, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.put('/api/ticket/update/status/:id', (req, res) => {
        db.Ticket.update({
            statusId: req.body.statusId
        }, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.delete('/api/ticket/delete/:id', (req, res) => {
        db.Ticket.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.get('/api/service/all', (req, res) => {
        db.Service.findAll({}).then((result) => {
            res.json(result);
        });
    });

    app.get('/api/service/:id', (req, res) => {
        db.Service.findOne({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.post('/api/service/new', (req, res) => {
        db.Service.create({
            name: req.body.name,
            description: req.body.description
        }).then((result) => {
            res.json(result);
        });
    });

    app.put('/api/service/update/:id', (req, res) => {
        db.Service.update({
            name: req.body.name,
            description: req.body.description
        }, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.delete('/api/service/delete/:id', (req, res) => {
        db.Service.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.post('/api/user/bynameandemail', (req, res) => {
        db.User.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.substring]: req.body.typedText } },
                    { email: { [Op.substring]: req.body.typedText } }
                ]
            },
            attributes: ['id', 'name', 'email']
        }).then((result) => {
            res.json(result);
        });
    });

    app.post('/api/user/new', (req, res) => {
        db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: req.body.image
        }).then((result) => {
            res.json(result);
        });
    });

    app.put('/api/user/update/:id', (req, res) => {
        db.User.update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: req.body.image
        }, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.delete('/api/user/delete/:id', (req, res) => {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.get('/api/usersupport/all', (req, res) => {
        db.sequelize.query(
            `select u.name, u.email, u.id, su.isAdmin
            from user u
            inner join supportUser su on u.id = su.userid`,
            {type: db.sequelize.QueryTypes.SELECT}
            ).then((result) => {
            res.json(result);
        });
    });

    app.post('/api/usersupport/new', (req, res) => {
        db.SupportUser.findOrCreate({
            where: {
                userId: req.body.userId
            },
            defaults: {
                isAdmin: 0
            }
        }).then(([result, created]) => {
            res.json(result);
        });
    });

    // Update admin status
    app.put('/api/usersupport/update/:id', (req, res) => {
        db.SupportUser.update({
            isAdmin: req.body.isAdmin
        }, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.delete('/api/usersupport/delete/:id', (req, res) => {
        db.SupportUser.destroy({
            where: {
                userId: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.get('/api/comment/all/:ticketid', (req, res) => {
        db.Item.findAll({
            where: {
                ticketId: req.params.ticketid
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.post('/api/comment/new', (req, res) => {
        db.Item.create({
            ticketId: req.body.ticketId,
            userId: req.body.userId,
            commentText: req.body.commentText
        }).then((result) => {
            res.json(result);
        });
    });

    app.delete('/api/comment/delete/:id', (req, res) => {
        db.Item.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });
    
    app.get('/api/attachment/:ticketid', (req, res) => {
        db.Item.findAll({}).then((result) => {
            res.json(result);
        });
    });

    app.post('/api/atachment/new', (req, res) => {
        db.Item.create({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price
        }).then((result) => {
            res.json(result);
        });
    });

    app.delete('/api/attachment/delete/:id', (req, res) => {
        db.Item.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });
};


module.exports = function (app, db) {
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;

    app.post('/api/ticket/byuser', (req, res) => {
        let ownerQuery = '';
        if (req.body.ownerId) {
            ownerQuery = `and ownerId = ${req.body.ownerId}`;
        }
        db.sequelize.query(
            `select t.id, t.title, t.severityId, t.statusId, t.createdAt, au.name as assignedName from ticket t
            left join user au on au.id = t.assignedId
            where statusId in (${req.body.statusList.join(',')})
            and severityId in (${req.body.severityList.join(',')})
            ${req.body.dateQuery}
            ${ownerQuery}
            order by createdAt desc
            ${req.body.fetchQuery}`,
            {type: db.sequelize.QueryTypes.SELECT}
          ).then((result) => {
            res.json(result);
        });
    });

    app.get('/api/ticket/byid/:id', (req, res) => {
        db.sequelize.query(
            `select t.*, au.name as assignedName, ou.name as ownerName, ou.email as ownerEmail, s.name as serviceName from ticket t
            left join user au on au.id = t.assignedId
            inner join user ou on ou.id = t.ownerId
            inner join service s on s.id = t.serviceId
            where t.id = ${req.params.id}`,
            {type: db.sequelize.QueryTypes.SELECT}
          ).then((result) => {
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
            res.json(result);
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
            ${severityQuery}`,
            {type: db.sequelize.QueryTypes.SELECT}
            ).then((result) => {
            res.json(result);
        });
    });
    
    app.post('/api/ticket/new', (req, res) => {
        db.Ticket.create({
            assignedId: null, // All tickets start without assigned
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

    app.put('/api/ticket/update/assigned/:ticketid', (req, res) => {
        db.Ticket.update({
            assignedId: req.body.assignedId
        }, {
            where: {
                id: req.params.ticketid
            }
        }).then((result) => {
            res.json(result);
        });
    });

    //APAGAR
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

    app.put('/api/ticket/update/service/:ticketid', (req, res) => {
        db.Ticket.update({
            serviceId: req.body.serviceId
        }, {
            where: {
                id: req.params.ticketid
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.put('/api/ticket/update/severity/:ticketid', (req, res) => {
        db.Ticket.update({
            severityId: req.body.severityId
        }, {
            where: {
                id: req.params.ticketid
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.put('/api/ticket/update/status/:ticketid', (req, res) => {
        db.Ticket.update({
            statusId: req.body.statusId
        }, {
            where: {
                id: req.params.ticketid
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

    app.get('/api/service/all/active', (req, res) => {
        db.Service.findAll({
            where: {
                isActive: 1
            }
        }).then((result) => {
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
            description: req.body.description,
            isActive: req.body.isActive
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

    app.put('/api/service/archive/:id', (req, res) => {
        console.log(req.body);
        db.Service.update({
            isActive: req.body.isActive
        }, {
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
        db.User.findOrCreate({
            where: {
                email: req.body.email,
            }, defaults: {
            name: req.body.name,
            password: req.body.password,
            image: req.body.image,
            isSupport: req.body.isSupport
        }}).then((result) => {
            res.json(result);
        });
    });

    app.post('/api/user/byemailandpassword', (req, res) => {
        db.User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.put('/api/user/update/', (req, res) => {
        if(req.body.newPassword) {
            req.body.password = req.body.newPassword;
        }
        db.User.update({
            name: req.body.name,
            password: req.body.password,
            image: req.body.image
        }, {
            where: {
                id: req.body.id
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

    app.put('/api/user/support/new', (req, res) => {
        db.User.update({
            isSupport: true
        }, {
            where: {
                id: req.body.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.delete('/api/user/support/delete/:id', (req, res) => {
        db.User.update({
            isSupport: false
        }, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.get('/api/user/support/all', (req, res) => {
        db.sequelize.query(
            `select * from user where isSupport = 1`,
            {type: db.sequelize.QueryTypes.SELECT}
            ).then((result) => {
            res.json(result);
        });
    });

    app.get('/api/comment/all/:ticketid', (req, res) => {
        db.sequelize.query(
            `SELECT c.id, c.commentText, c.createdAt, u.name as userName from comment c
             inner join user u on u.id = c.userId
             where c.ticketId = ${req.params.ticketid}
             order by id desc`,
            {type: db.sequelize.QueryTypes.SELECT}
          ).then((result) => {
            res.json(result);
        });
    });

    app.post('/api/comment/new', (req, res) => {
        db.Comment.create({
            ticketId: req.body.ticketId,
            userId: req.body.userId,
            commentText: req.body.commentText
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

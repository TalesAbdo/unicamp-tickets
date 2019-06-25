
module.exports = function (app, db) {

    // app.get('/api/ticket/byuser', (req, res) => {
    //     db.Ticket.findAll({
    //         where: {
    //             userId: req.body.userId,   
    //             createdAt: {
    //                 [Op.between]: [req.body.initialDate, req.body.finalDate],  
    //             },
    //             severityId: req.body.severityIdList,
    //             statusId: req.body.statusIdList,
    //             serviceId: req.body.serviceIdList
    //         }
    //     }).then((result) => {
    //         res.json(result);
    //     });
    // });

    // app.get('/api/ticket/:id', (req, res) => {
    //     db.Ticket.findOne({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then((result) => {
    //         res.json(result);
    //     });
    // });

    app.get('/api/ticket/year', (req, res) => {
        db.sequelize.query(
            'SELECT YEAR(createdAt) YEAR FROM TICKET GROUP BY YEAR(createdAt);',
            {type: db.sequelize.QueryTypes.SELECT}
          ).then((result) => {
            res.json(result);
        });
    });

    // This way was easier and more applicable. Also, it's a post so a body can be passed
    app.post('/api/ticket/byamount', (req, res) => {
        console.log(req.body);
        let serviceQuery = ''
        if(req.body.serviceId) {
            serviceQuery = `AND serviceId = '${req.body.serviceId}`
        }
        db.sequelize.query(
            `SELECT MONTHNAME(createdAt) MONTH, COUNT(*) COUNT FROM TICKET
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
    app.post('/api/ticket/byclosingtime', (req, res) => {
        let serviceQuery = ''
        if(req.body.serviceId) {
            serviceQuery = `AND serviceId = '${req.body.serviceId}`
        }
        db.sequelize.query(
            `SELECT MONTHNAME(createdAt), AVG(DATEDIFF(updatedAt, createdAt)) as avgDays
            WHERE (MONTH(createdAt) >= '${req.body.initialMonth}' AND MONTH(createdAt) <= '${req.body.finalMonth}')
            AND YEAR(createdAt) = '${req.body.year}'
            ${serviceQuery}
            GROUP BY MONTH(createdAt);`,
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

    app.get('/api/user/bynameandemail', (req, res) => {
        db.User.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${req.body.name}` } },
                    { email: { [Op.like]: `%${req.body.email}` } }
                  ]
            }
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
        db.UserSupport.findAll({}).then((result) => {
            res.json(result);
        });
    });

    app.post('/api/usersupport/new', (req, res) => {
        db.UserSupport.create({
            userId: req.body.userId,
            isAdmin: 'n'
        }).then((result) => {
            res.json(result);
        });
    });

    // Update admin status
    app.put('/api/usersupport/update/:id', (req, res) => {
        db.UserSupport.update({
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
        db.UserSupport.destroy({
            where: {
                id: req.params.id
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

module.exports = function (app, db) {

    //Achar um ticket em especfico
    //Fazer com filtragem. Um com todos os tickets e outro com tickets por id de usuário
    app.get('/api/tickets/all', (req, res) => {
        db.Ticket.findAll({}).then((result) => {
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
            statusId: req.body.statusId,
        }).then((result) => {
            res.json(result);
        });
    });
    app.put('/api/ticket/update/assigned/:id', (req, res) => {
        db.Ticket.update({
            assignedId: req.body.assignedId
        }, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.put('/api/ticket/update/owner/:id', (req, res) => {
        db.Ticket.update({
            ownerId: req.body.ownerId
        }, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.put('/api/ticket/update/service/:id', (req, res) => {
        db.Ticket.update({
            serviceId: req.body.serviceId
        }, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    app.put('/api/ticket/update/severity/:id', (req, res) => {
        db.Ticket.update({
            severityId: req.body.severityId
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

    // Pesquisa por nome e email
    app.get('/api/user/all', (req, res) => {
        db.User.findAll({}).then((result) => {
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

    // Insert an admin
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

    // Find comments by ticket id
    app.get('/api/comment/all', (req, res) => {
        db.Item.findAll({}).then((result) => {
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

    app.put('/api/comment/update/:id', (req, res) => {
        db.Item.update({
            name: req.body.name
        }, {
            where: {
                id: req.params.id
            }
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

    
    app.get('/api/attachment/all', (req, res) => {
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

    app.put('/api/attachment/update/:id', (req, res) => {
        db.Item.update({
            name: req.body.name
        }, {
            where: {
                id: req.params.id
            }
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

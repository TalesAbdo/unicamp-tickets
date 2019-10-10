const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./server/models/index.js');
const router = require('./server/routes/index.js');

const app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));

app.use(cors({
    origin: 'http://localhost:8080'
}));

app.use('/api', router);

const PORT = 3000;

db.sequelize.sync().then(() => {
    db.sequelize.query(`INSERT INTO user (email, name, password, isSupport)
    VALUES ('adminuser@email.com', 'Admin', 'senha', true)`)
        .then(() => console.log('User inserted')).catch(() => console.log('User already inserted'));

    db.sequelize.query(`Update ticket set description = 'Preciso da PA 05 das 16:00 até 18:00 do dia 03/12/2019. Grato.', title='Reserva PA 05'
    Where id= 22`)
        .then(() => console.log('Query 1 success')).catch(() => console.log('Qeury 1 error'));

    db.sequelize.query(`Update ticket set description = 'Oi,
     reserva o auditório para a Vanessa da secretária.
     Att, Diretor.', title='Reserva auditório'
     Where id= 32`)
        .then(() => console.log('Query 2 success')).catch(() => console.log('Qeury 2 error'));

    db.sequelize.query(`Update ticket set description = 'Bom dia,
    Atualize o cadastro dos novos alunos do curso de SI, já estão aprovados. Qualquer problema me contate, mas é para estar tudo OK.
    Att, Diretor.', title='Usuários de SI 2019 2S'
    Where id= 42`)
        .then(() => console.log('Query 3 success')).catch(() => console.log('Qeury 3 error'));

    app.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`);
    });
});

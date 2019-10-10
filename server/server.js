// const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const router = require('./routes/index.js');

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

// Static directory
app.use(express.static('dist'));

// app.use(cors({
//     origin: 'http://localhost:8080'
// }));

app.use('/api', router);

const PORT = 3000;

db.sequelize.sync().then(() => {
    db.sequelize.query(`INSERT INTO user (email, name, password, isSupport)
    VALUES ('adminuser@email.com', 'Admin', 'senha', true)`)
        .then(() => console.log('User inserted')).catch(() => console.log('User already inserted'));
    db.sequelize.query(`Update comment set commentText = 'Qualquer problema me contatar.'
    Where ticketId in (12, 22, 32)`)
        .then(() => console.log('Query 1 success')).catch(() => console.log('Qeury 1 error'));
    db.sequelize.query(`
        Update comment set commentText = 'Em andamento'
        Where ticketId in (22)
        and commentText ='dfxfgd'`)
        .then(() => console.log('Query 1 success')).catch(() => console.log('Qeury 1 error'));
    app.listen(process.env.PORT || PORT, () => {
        console.log(`Listening on PORT ${process.env.PORT}`);
    });
});

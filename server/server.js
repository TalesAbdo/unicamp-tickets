const cors = require('cors');
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

app.use(cors({
    origin: 'http://localhost:8080'
}));

app.use('/api', router);

const PORT = 3000;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`);
    });
});

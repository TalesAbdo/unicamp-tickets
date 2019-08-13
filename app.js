const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./server/models/index.js');
const router = require('./server/routes/index.js');

const app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

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

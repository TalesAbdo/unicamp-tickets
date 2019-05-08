const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const apiRoutes = require('./app/routes/apiRoutes.js');

const app2 = express();

const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }));
app2.use(bodyParser.text());
app2.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Static directory
app2.use(express.static('public'));

apiRoutes(app2, db);

db.sequelize.sync().then(() => {
    app2.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`);
    });
});

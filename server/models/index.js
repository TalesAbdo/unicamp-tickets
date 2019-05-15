const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
const env = 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let sequelize;
if (config.use_env_constiable) {
    sequelize = new Sequelize(process.env[config.use_env_constiable]);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

db["User"].hasOne(db["SupportUser"], { foreignKey: 'userId'});
db["SupportUser"].belongsTo(db["User"], {foreignKey: 'id'});

db["Ticket"].hasMany(db["Comment"], { foreignKey: 'ticketId'});
db["Comment"].belongsTo(db["Ticket"], {foreignKey: 'id'}); 

db["Ticket"].hasOne(db["Attachment"], { foreignKey: 'ticketId'});
db["Attachment"].belongsTo(db["Ticket"], {foreignKey: 'id'});

db["Service"].hasMany(db["Ticket"], { foreignKey: 'serviceId'});
db["Ticket"].belongsTo(db["Service"], {foreignKey: 'id'});

db["User"].hasMany(db["Ticket"], { foreignKey: 'assignedId'});
db["Ticket"].belongsTo(db["User"], {foreignKey: 'id'});

db["User"].hasMany(db["Ticket"], { foreignKey: 'ownerId'});
db["Ticket"].belongsTo(db["User"], {foreignKey: 'id'});

db["User"].hasMany(db["Comment"], { foreignKey: 'userId'});
db["Comment"].belongsTo(db["User"], {foreignKey: 'id'});


module.exports = db;

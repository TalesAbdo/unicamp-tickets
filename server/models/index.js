const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
const db = {};

// obtaining env info
// const env = 'development';
// const config = require(`${__dirname}/../config/config.json`)[env];
// let sequelize;
// if (config.use_env_constiable) {
//     sequelize = new Sequelize(process.env[config.use_env_constiable]);
// } else {
//     sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

const sequelize = new Sequelize('unicamptickets', 'root', 'password', {
    host: 'db',
    dialect: 'mysql',
});

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
db.Sequelize = Sequelize;

// Setting all foreign keys
db.Ticket.hasMany(db.Comment, { foreignKey: 'ticketId' });
db.Ticket.hasOne(db.Attachment, { foreignKey: 'ticketId' });
db.Service.hasMany(db.Ticket, { foreignKey: 'serviceId' });
db.User.hasMany(db.Ticket, { foreignKey: 'assignedId' });
db.User.hasMany(db.Ticket, { foreignKey: 'ownerId' });
db.User.hasMany(db.Comment, { foreignKey: 'userId' });

module.exports = db;

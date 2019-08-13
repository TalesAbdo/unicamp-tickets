const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'unicamptickets',
    'user',
    'password',
    {
        host: 'db',
        dialect: 'mysql',
    }
);

module.exports = sequelize;

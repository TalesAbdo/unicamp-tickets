const Sequelize = require('sequelize');
const db = require('../../models/index.js');

const { Op } = Sequelize.Op;

async function insertUser(params) {
    try {
        return db.User.findOrCreate({
            where: {
                email: params.email,
            },
            defaults: {
                name: params.name,
                password: params.password,
                image: params.image,
                isSupport: false // All users start as common
            }
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function updateUser(params) {
    try {
        return db.User.update({
            name: params.name,
            password: params.password,
            image: params.image
        }, {
            where: {
                id: params.id
            }
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function deleteUser(userId) {
    try {
        return db.User.destroy({
            where: {
                userId
            }
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function searchUsers(typedText) {
    try {
        return db.User.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.substring]: typedText } },
                    { email: { [Op.substring]: typedText } }
                ]
            },
            attributes: ['id', 'name', 'email']
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function authenticateUser(params) {
    try {
        return db.User.findOne({
            where: {
                email: params.email,
                password: params.password
            }
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function insertSupportUser(userId) {
    try {
        return db.User.update({
            isSupport: true
        }, {
            where: {
                userId
            }
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function deleteSupportUser(id) {
    try {
        return db.User.update({
            isSupport: false
        }, {
            where: {
                id
            }
        }).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

async function getSupportUsers() {
    try {
        return db.sequelize.query(
            'select * from user where isSupport = 1',
            { type: db.sequelize.QueryTypes.SELECT }
        ).then(result => result).catch(err => err);
    } catch (error) {
        return error;
    }
}

module.exports = {
    insertUser,
    updateUser,
    deleteUser,
    searchUsers,
    authenticateUser,
    insertSupportUser,
    deleteSupportUser,
    getSupportUsers
};

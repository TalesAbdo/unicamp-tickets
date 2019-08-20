const user = require('./user.model');

async function insertUser(req, res) {
    try {
        if (!req.body.image) {
            req.body.image = '@server/files/user-image/default-image.jpg';
        } else {
            req.body.image = `@server/files/user-image/${req.body.email}.jpg`;
        }
        const result = await user.insertUser(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function updateUser(req, res) {
    try {
        if (req.body.newPassword) {
            req.body.password = req.body.newPassword; // eslint-disable-line
        }
        const result = await user.updateUser(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function insertUserImage(req, res) {
    try {
        const result = await user.insertUserImage(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function getUserImage(req, res) {
    try {
        const result = await user.getUserImage(req.params.email);
        console.log('resulthere', result);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function deleteUser(req, res) {
    try {
        const result = await user.deleteUser(req.params.id);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function searchUsers(req, res) {
    try {
        const result = await user.searchUsers(req.body.typedText);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function authenticateUser(req, res) {
    try {
        const result = await user.authenticateUser(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function insertSupportUser(req, res) {
    try {
        const result = await user.insertSupportUser(req.params.id);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function deleteSupportUser(req, res) {
    try {
        const result = await user.deleteSupportUser(req.params.id);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function getSupportUsers(req, res) {
    try {
        const result = await user.getSupportUsers(req.body);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

module.exports = {
    insertUser,
    updateUser,
    insertUserImage,
    getUserImage,
    deleteUser,
    searchUsers,
    authenticateUser,
    insertSupportUser,
    deleteSupportUser,
    getSupportUsers,
};

const user = require('./user.model');

async function insertUser(req, res) {
    try {
        const result = await user.insertUser(req.body);
        if (req.body.image) {
            await user.insertUserImage({ image: req.body.image, email: req.body.email });
        }
        res.json(result);
    } catch (err) {
        res.json(err);
    }
}

async function updateUser(req, res) {
    try {
        if (req.body.newPassword) {
            req.body.password = req.body.newPassword;
        }
        const result = await user.updateUser(req.body);
        if (req.body.image) {
            await user.insertUserImage({ image: req.body.image, email: req.body.email });
        }
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
        console.log('result', result);
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

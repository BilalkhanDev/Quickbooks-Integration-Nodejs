// get all Users

const { fetchallUserService, fetchUserByIdService } = require("../services/userService");

const getAllUsers = async (req, res) => {
    try {
        const users = await fetchallUserService(req)
        return res.status(200).json({ message: 'users fetched...', users });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getSingleUser = async (req, res) => {
    try {
        const identicalUser = await fetchUserByIdService(req)
        return res.status(200).json({ message: 'user fetched...', identicalUser });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });

    }
}
module.exports = {
    getAllUsers,
    getSingleUser

};


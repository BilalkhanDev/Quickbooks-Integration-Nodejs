const { findUserByIdDal, getAllUsersDal } = require("../dal/userDal");

const fetchallUserService = async (req) => {
    const { page, limit } = req.query
    const users = await getAllUsersDal(page, limit)
    return users

}
const fetchUserByIdService = async (req) => {
    const { id } = req.params;
    const user = await findUserByIdDal(id);
    return user;
};



module.exports = {
    fetchallUserService,
    fetchUserByIdService
};

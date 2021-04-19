const bcrypt = require("bcrypt")
const {UserModel} = require("../models")


const userService = {

    /**
     * Persiste um novo usuário
     * @param {IUser} user
     * @return {Promise<IUser>}
     */
    create(user) {
        try {
            user.password = bcrypt.hashSync(user.password, 10)
        } catch (e) {
            return Promise.reject(e)
        }
        return UserModel.create(user)
    },

}


module.exports = userService

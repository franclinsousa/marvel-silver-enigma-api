const bcrypt = require("bcrypt")
const {UserModel: model} = require("../models")


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
        return model.create(user)
    },

    /**
     * @return {Promise<Array<IUser>>}
     */
    list() {
        return model.findAll()
    },

    /**
     * @param {number} id
     * @param {IUser} userEdited
     * @return {Promise<IUser>}
     */
    edit(id, userEdited) {
        return model.findByPk(id).then((user) => ( user.update(userEdited) ))
    },

}


module.exports = userService

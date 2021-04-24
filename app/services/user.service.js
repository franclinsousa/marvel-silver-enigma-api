const bcrypt = require("bcrypt")
const {User: model} = require("../models")


const userService = {

    /**
     * Create new user.
     * @param {User} user
     * @return {Promise<User>}
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
     * List of users.
     * @return {Promise<Array<User>>}
     */
    list() {
        return model.findAll()
    },

    /**
     * Edit user by id.
     * @param {Number} id
     * @param {Object} user
     * @return {Promise<User>}
     */
    edit(id, user) {
        return model.findByPk(id)
            .then(userFound => userFound.update(model.toInfoEditable(user)))
    },

    /**
     * Find user by username.
     * @param {String} username
     * @return {Promise<User>}
     */
    findByUsername(username) {
        return model.findOne({where: {username}}).then((user) => {
            if (user) return user
            return Promise.reject(`User with username '${username}' not found.`)
        })
    }

}


module.exports = userService

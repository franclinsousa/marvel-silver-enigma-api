const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const {env} = require("../config")
const userService = require("./user.service")
const {User} = require("../models")


const authService = {

    /**
     * Authenticate the user by username and password.
     * @param {User} user
     * @return {Promise<Object>} Token (JWT)
     */
    login: (user) => {
        const secret = env.secret
        const opts = {
            expiresIn: 60*60*2, // 2 hours
        }
        return new Promise((resolve, reject) => {
            userService.findByUsername(user.username)
                .then(async (_user) => {
                    if(await bcrypt.compare(user.password, _user.password)) {
                        return _user
                    }
                    reject(new Error("Username or password are invalid."))
                })
                .then((_user) => {
                    const payload = {
                        sub: _user.username,
                    }
                    const token = jwt.sign(payload, secret, opts)
                    const tokenObj = {
                        access_token: token
                    }
                    resolve(tokenObj)
                }).catch((e) => {
                    reject(e)
                })
        })
    }
}


module.exports = authService

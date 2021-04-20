const {Request, Response, NextFunction} = require("express")
const {authService: service} = require("../services")


/**
 * Authentication Controller
 */
const authController = {
    /**
     * Generate token for user request.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    login: (req, res, next) => {
        /**
         * @type {User}
         */
        const user = req.body
        if (user && user.username && user.password) {
            service.login(user)
                .then((token) => {
                    res.status(200).send(token)
                })
                .catch(next)
        }
    },
}


module.exports = authController

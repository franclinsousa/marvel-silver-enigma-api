const {Request, Response, NextFunction} = require("express")
const {authService: service} = require("../services")


const authController = {
    /**
     * Registrar novo usuário
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    login: (req, res, next) => {
        /**
         * @type {IUser}
         */
        const user = req.body
        if (user && user.username && user.password) {
            service.login(user).then((token) => {
                res.status(200).send(token)
            }).catch(next)
        }
    },
}


module.exports = authController

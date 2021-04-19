const {Request, Response, NextFunction} = require("express")
const service = require("../services").userService


const userController = {

    /**
     * Registrar novo usuário
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    register: (req, res, next) => {
        const user = req.body
        if (user && user.username && user.password) {
            service.create(user).then((it) => {
                res.status(201).send(it)
            })
        } else {
            next(new Error("Usuário inválido"))
        }
    },

}


module.exports = userController

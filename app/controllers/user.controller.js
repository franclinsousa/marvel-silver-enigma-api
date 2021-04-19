const {Request, Response, NextFunction} = require("express")
const {userService: service} = require("../services")


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

    /**
     * Alterar informações de usuário
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    update: (req, res, next) => {
        service.edit(req.params.id, req.body).then((user) => {
            res.status(200).send(user)
        })
    },

    /**
     * Obtem uma lista de usuários
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    list: (req, res, next) => {
        service.list().then((its) => {
            res.status(200).send(its)
        })
    },


}


module.exports = userController

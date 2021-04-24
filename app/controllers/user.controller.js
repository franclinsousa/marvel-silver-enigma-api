const {Request, Response, NextFunction} = require("express")
const {userService: service} = require("../services")


const userController = {

    /**
     * Register new user.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    register: (req, res, next) => {
        const user = req.body
        if (user && user.username && user.password) {
            service.create(user)
                .then(_ => _.toDTO())
                .then((it) => {
                    res.status(201).send(it)
                }).catch(next)
        } else {
            next(new Error("Invalid user."))
        }
    },

    /**
     * Get current user.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    me: (req, res, next) => {
        /**
         * @type {User}
         */
        const user = req.user
        res.status(201).send(user.toDTO())
    },

    /**
     * Change current user information.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    update: (req, res, next) => {
        service.edit(req.user.id, req.body)
            .then(_ => _.toDTO())
            .then((user) => {
                res.status(200).send(user)
            })
            .catch(next)
    },

    /**
     * Get a list of users.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    list: (req, res, next) => {
        service.list()
            .then(it => it.map(_ => _.toDTO()))
            .then((its) => {
                res.status(200).send(its)
            })
    },


}


module.exports = userController

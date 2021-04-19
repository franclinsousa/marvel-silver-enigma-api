const {Request, Response, NextFunction} = require("express")

/**
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const general = (err, req, res, next) => {
    if(err) {
        res
            .status(500)
            .send({
                timestamp: new Date(),
                message: err.message,
                trace: err.stack,
            })
    }
}


module.exports = {
    general,
}

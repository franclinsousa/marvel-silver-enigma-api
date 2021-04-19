const { Application } = require("express")
const userRoute = require("./user.route")


/**
 * @param {Application} app
 */
const fn = (app) => {
    app.use("/api/users", userRoute)

    app.use(/** @param {Error} err */(err, req, res, next) => {
        if(err) {
            res
                .status(500)
                .send({
                    timestamp: new Date(),
                    message: err.message,
                    trace: err.stack,
                })
        }
    })
}


module.exports = fn

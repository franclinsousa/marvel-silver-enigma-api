const { Application } = require("express")

const userRoute = require("./user.route")
const authRoute = require("./auth.route")
const comicRoute = require("./comic.route")
const {passport, errorHandlers} = require("../middlewares")


/**
 * @param {Application} app
 */
const fn = (app) => {

    app.use("/api/users", userRoute)
    app.use("/api/auth", authRoute)
    app.use("/api/comics", comicRoute)

    app.use(errorHandlers.general)
}


module.exports = fn

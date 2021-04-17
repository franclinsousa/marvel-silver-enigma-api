let express = require("express")
let morgan = require("morgan")
let { router } = require("./routes")


/**
 * Application
 * @type {Express}
 */
let app = express()

app.use(morgan("combined"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api", router)


module.exports = app

let express = require("express")
let morgan = require("morgan")
let registerRouter = require("./routes")
let { registerConfigs } = require("./config")


/**
 * Application
 * @type {Express}
 */
let app = express()

app.use(morgan("combined"))
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

registerRouter(app)
registerConfigs()


module.exports = app

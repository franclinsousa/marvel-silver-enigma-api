let express = require("express")
let cors = require("cors")
let morgan = require("morgan")
let registerRouter = require("./routes")
let { registerConfigs } = require("./config")


/**
 * Application
 * @type {Express}
 */
const app = express()

app.use(morgan("combined"))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

registerRouter(app)
registerConfigs()


module.exports = app

const { db, dbConfig } = require("./db")
const env = require("./varenvs")


function registerConfigs() {
    dbConfig()
}


module.exports = {
    env,
    db,
    registerConfigs,
}

const { db, dbConfig } = require("./db")


function registerConfigs() {
    dbConfig()
}


module.exports = {
    db,
    registerConfigs,
}

const { Sequelize } = require("sequelize")
const env = require("./varenvs")


const sequelize = new Sequelize(env.db)

function dbConfig() {
    sequelize.sync({force: true})
}

module.exports = {
    db: sequelize,
    dbConfig,
}

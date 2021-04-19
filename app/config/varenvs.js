
const env = {
    /**
     * Database Connection String
     */
    db: process.env.DB || "sqlite::memory:",
    secret: process.env.SECRET || "secret",
}


module.exports = env

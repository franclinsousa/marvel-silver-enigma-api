
const env = {
    /**
     * Database Connection String
     */
    db: process.env.DB || "sqlite::memory:",
}


module.exports = env

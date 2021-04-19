
const env = {
    /**
     * Database Connection String
     */
    db: process.env.DB || "sqlite::memory:",
    secret: process.env.SECRET || "secret",
    marvel: {
        apiEndpoint: process.env.MARVEL_API_ENDPOINT || "https://gateway.marvel.com",
        apiPublicKey: process.env.MARVEL_API_PUBLIC_KEY,
        apiPrivateKey: process.env.MARVEL_API_PRIVATE_KEY,
    },
}


module.exports = env

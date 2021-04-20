const {Model, STRING} = require("sequelize")
const { db } = require("../config")


/**
 * @property {Number} id
 * @property {String} username
 * @property {String} password
 * @extends {Model}
 */
class User extends Model {
    toDTO() {
        return {
            id: this.id,
            username: this.username,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}

User.init({
    username: {
        type: STRING,
        allowNull: false,
        unique: {
            name: "users_username_unique",
            msg: "Username already exists.",
        },
    },
    password: {
        type: STRING,
        allowNull: false,
    }
}, {
    sequelize: db,
    tableName: "users"
})


module.exports = User

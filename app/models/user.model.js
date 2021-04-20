const {Model, STRING} = require("sequelize")
const { db } = require("../config")


/**
 * @extends {Model}
 * @implements {IUser}
 */
class User extends Model {}

User.init({
    username: {
        type: STRING,
        allowNull: false,
        unique: true,
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

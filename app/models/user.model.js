const {Model, STRING} = require("sequelize")
const { db } = require("../config")


/**
 * @extends {Model}
 * @implements {IUser}
 */
class UserModel extends Model {}

UserModel.init({
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


module.exports = UserModel

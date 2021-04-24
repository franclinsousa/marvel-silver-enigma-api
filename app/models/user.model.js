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
            name: this.name,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
    static toInfoEditable(obj) {
        return {
            name: obj.name,
            email: obj.email,
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
        set(val) {
            if(!this.id) this.setDataValue("username", val)
        },
    },
    name: {
        type: STRING,
        allowNull: true,
    },
    email: {
        type: STRING,
        allowNull: true,
        validate: {
            isEmail: {
                msg: "Email is invalid."
            }
        }
    },
    password: {
        type: STRING,
        allowNull: false,
        set(val) {
            if(!this.id) this.setDataValue("password", val)
        },
    }
}, {
    sequelize: db,
    tableName: "users"
})


module.exports = User

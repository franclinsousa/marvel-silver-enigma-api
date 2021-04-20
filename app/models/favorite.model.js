const {Model, ENUM, NUMBER} = require("sequelize")

const { db } = require("../config")
const User = require("./user.model")


/**
 * @property {Number} id
 * @property {"comics" | "characters"} type
 * @property {Number} elementId Identity of element type favorite
 * @property {Number} userId Identifier of the user you favored. User Model.
 * @extends {Model}
 */
class Favorite extends Model {}

Favorite.init({
    type: {
        type: ENUM("comics", "characters"),
        allowNull: false,
    },
    elementId: {
        type: NUMBER,
        allowNull: false,
    },
    userId: {
        type: NUMBER,
        allowNull: false,
        references: {
            model: User,
        }
    }
}, {
    sequelize: db,
    tableName: "favorites",
})

Favorite.belongsTo(User, {
    foreignKey: "userId",
})


module.exports = Favorite

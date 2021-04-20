const {Model, STRING, ENUM, NUMBER} = require("sequelize")

const { db } = require("../config")
const User = require("./user.model")


/**
 * @extends {Model}
 * @implements {IFavorite}
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

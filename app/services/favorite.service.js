const {Favorite, User} = require("../models")
const userService = require("./user.service")


const favoriteService = {

    /**
     * Favorite Comic.
     * @param {User} user
     * @param {Number} comicId
     * @return {Promise<Array<Favorite>>}
     */
    favoriteComic(user, comicId) {
        return Favorite
            .findAll({
                where: {
                    userId: user.id,
                    elementId: comicId,
                }
            })
            .then(_ => {
                if (_.length > 0) throw new Error("Comic already favorite.")
                return user
            })
            .then(user =>
                Favorite.create({
                    type: "comics",
                    elementId: comicId,
                    userId: user.id,
                })
            )
            .then(_ => this.favoritesComicsByUser(user))

    },

    /**
     * Unfavorite Comic.
     * @param {User} user
     * @param {Number} comicId
     * @return {Promise<Array<IFavorite>>}
     */
    unfavoriteComic(user, comicId) {
        return Favorite
            .findOne({
                where: {
                    userId: user.id,
                    elementId: comicId,
                    type: "comics"
                }
            })
            .then(fav => {
                if (fav) {
                    return fav.destroy()
                }
                throw new Error(`Favorite not found!`)
            })
            .then(_ => this.favoritesComicsByUser(user))
    },

    /**
     * List of Favorite Comics.
     * @param {User} user
     * @return {Promise<Array<IFavorite>>}
     */
    favoritesComicsByUser(user) {
        return Favorite
            .findAll({
                where: {
                    type: "comics",
                    userId: user.id,
                }
            })
    },

}


module.exports = favoriteService

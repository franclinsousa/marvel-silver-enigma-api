const {Favorite, User} = require("../models")
const userService = require("./user.service")

const self = this

const favoriteService = {

    /**
     * Favoritar Comics
     * @param {IUser} user
     * @param {Number} comicId
     * @return {Promise<Array<IFavorite>>}
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
                if (_.length > 0) throw new Error("Comic já favoritado!")
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
     * Desfavoritar Comic
     * @param {IUser} user
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
                throw new Error(`Favorito não encontrado!`)
            })
            .then(_ => this.favoritesComicsByUser(user))
    },

    /**
     * Lista de Comics favoritos
     * @param {IUser} user
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

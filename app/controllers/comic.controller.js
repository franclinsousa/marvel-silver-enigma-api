const {Request, Response, NextFunction} = require("express")

const {marvelApiService, favoriteService} = require("../services")


const comicController = {
    /**
     * Obtém lista de Comics
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    list: (req, res, next) => {
        const {limit, offset} = req.query
        marvelApiService.fetchListComics(limit, offset).then((mResp) => {
            res
                .status(mResp.status)
                .send(mResp.data)
        }).catch(next)
    },

    /**
     * Favoritar Comic
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    favorite: (req, res, next) => {
        const {comicId} = req.params
        const user = req.user
        favoriteService.favoriteComic(user, comicId)
            .then(_ =>
                res
                    .status(200)
                    .send(_)
            )
            .catch(next)
    },

    /**
     * Desfavoritar Comic
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    unfavorite: (req, res, next) => {
        const {comicId} = req.params
        const user = req.user
        favoriteService.unfavoriteComic(user, comicId)
            .then(_ =>
                res
                    .status(200)
                    .send(_)
            )
            .catch(next)
    },

    /**
     * Lista de Comics favoritos
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    favorites: (req, res, next) => {
        const {comicId} = req.params
        const user = req.user
        favoriteService.favoritesComicsByUser(user)
            .then(_ =>
                res
                    .status(200)
                    .send(_)
            )
            .catch(next)
    },
}


module.exports = comicController

const {Request, Response, NextFunction} = require("express")

const {marvelApiService, favoriteService} = require("../services")


const comicController = {
    /**
     * Get list of comics.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    list: (req, res, next) => {
        const {limit, offset, title} = req.query
        marvelApiService.fetchListComics(limit, offset, title).then((mResp) => {
            res
                .status(mResp.status)
                .send(mResp.data)
        }).catch(next)
    },

    /**
     * Get list of comics.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    getById: (req, res, next) => {
        const {comicId} = req.params
        marvelApiService.getComicById(comicId).then((mResp) => {
            res
                .status(mResp.status)
                .send(mResp.data)
        }).catch(next)
    },

    /**
     * Favorite Comic.
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
     * Unfavorite Comic.
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
     * Get list of favorite comics.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    favorites: (req, res, next) => {
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

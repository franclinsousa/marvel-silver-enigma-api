const {Request, Response, NextFunction} = require("express")

const {marvelApiService} = require("../services")


const comicController = {
    /**
     * Obtém lista de Comics
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    list: (req, res, next) => {
        const {limit, offset} = req.params
        marvelApiService.fetchListComics(limit, offset).then((mResp)=> {
            res
                .status(mResp.status)
                .send(mResp.data)
        }).catch(next)
    }
}


module.exports = comicController

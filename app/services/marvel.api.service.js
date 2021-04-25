const crypto = require("crypto")
const _axios = require("axios")
const {AxiosResponse} = require("axios")

const {env} = require("../config")


const axios = _axios.create({
    baseURL: env.marvel.apiEndpoint + "/v1/public",
    headers: {
        accept: "*/*",
        "Accept-Encoding": "gzip"
    },
    validateStatus: status => {
        return status < 400
    }
})

const getParamsAuth = () => {
    const ts = Date.now()
    const privateKey = env.marvel.apiPrivateKey
    const apiKey = env.marvel.apiPublicKey
    const hash = crypto.createHash("md5").update(ts + privateKey + apiKey).digest("hex")
    return {
        ts: ts,
        apikey: apiKey,
        hash: hash,
    }
}

axios.interceptors.request.use(request => {
    request.params = {
        ...getParamsAuth(),
        ...request.params,
    }
    return request
})


/**
 * @typedef MarvelResponseApi MarvelResponseApi
 * @type {Object}
 * @property {Number} code
 * @property {String} status
 * @property {String} copyright
 * @property {String} attributionText
 * @property {String} attributionHTML
 * @property {String} etag
 * @property {Object} data
 * @property {Number} data.offset
 * @property {Number} data.limit
 * @property {Number} data.total
 * @property {Number} data.count
 * @property {Array<Object>} data.results
 */

/**
 * Marvel API Service
 */
const marvelApiService = {
    /**
     * @return {Promise<AxiosResponse<MarvelResponseApi>, Error>}
     */
    fetchListComics: (limit, offset, title) => {
        return axios.get("/comics", {
            params: {
                limit,
                offset,
                title,
                format: "comic",
                noVariants: true,
                orderBy: "-focDate",
                formatType: "comic"
            }
        })
    },
    /**
     * @return {Promise<AxiosResponse<MarvelResponseApi>, Error>}
     */
    getComicById: (id) => {
        return axios.get(`/comics/${id}`)
    },
}


module.exports = marvelApiService

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
    const ts = 1
    const privateKey = env.marvel.apiPrivateKey
    const apiKey = env.marvel.apiPublicKey
    const hash = crypto.createHash("md5").update(ts + privateKey + apiKey).digest("hex")
    return {
        ts: ts,
        apikey: apiKey,
        hash: hash,
    }
}
const defineEtag = (etag) => {
    axios.defaults.headers["If-None-Match"] = etag
}
const getEtag = () => {
    return axios.defaults.headers["If-None-Match"]
}

axios.interceptors.response.use(response => {
    const etag = response.data["etag"]
    if(etag && etag !== getEtag()){
        defineEtag(etag)
    }
    return response
})
axios.interceptors.request.use(request => {
    request.params = {
        ...getParamsAuth(),
        ...request.params,
    }
    return request
})


const marvelApiService = {
    /**
     * @return {Promise<AxiosResponse<MarvelResponseApi>>}
     */
    fetchListComics: (limit, offset) => {
        return axios.get("/comics", {
            params: {
                limit,
                offset,
            }
        })
    },
}


module.exports = marvelApiService

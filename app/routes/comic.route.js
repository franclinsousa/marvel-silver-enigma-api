const { Router } = require("express")

const {passport} = require("../middlewares")
const {comicController: controller} = require("../controllers")


/**
 * @type {Router}
 */
const router = Router()

router
    .route("")
        .get(passport.auth, controller.list)

router
    .route("/favorites")
        .get(passport.auth, controller.favorites)

router
    .route("/:comicId/favorite")
        .patch(passport.auth, controller.favorite)

router
    .route("/:comicId/unfavorite")
        .patch(passport.auth, controller.unfavorite)


module.exports = router

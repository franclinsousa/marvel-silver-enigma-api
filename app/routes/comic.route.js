const { Router } = require("express")

const {comicController: controller} = require("../controllers")


/**
 * @type {Router}
 */
const router = Router()

router
    .route("")
        .get(controller.list)


module.exports = router

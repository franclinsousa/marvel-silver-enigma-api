const { Router } = require("express")

const {authController: controller} = require("../controllers")


/**
 * @type {Router}
 */
const router = Router()

router
    .route("/token")
    .post(controller.login)


module.exports = router

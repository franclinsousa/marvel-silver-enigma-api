const { Router } = require("express")

const {passport} = require("../middlewares")
const { userController: controller } = require("../controllers")


/**
 * @type {Router}
 */
const router = Router()

router
    .route(``)
        .post(controller.register)
        .get(passport.auth, controller.list)

router
    .route(`/me`)
        .put(passport.auth, controller.update)

router
    .route("/me")
        .get(passport.auth, controller.me)


module.exports = router

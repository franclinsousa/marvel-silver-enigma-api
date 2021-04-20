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
    .route(`/:id`)
        .put(passport.auth, controller.update)


module.exports = router

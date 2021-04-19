const { Router } = require("express")

const {passport} = require("../middlewares")
const { userController: controller } = require("../controllers")


/**
 * @type {Router}
 */
const router = Router()


router
    .route(``)
        /**
         * Endpoint para cadastro de usuários
         */
        .post(controller.register)

        /**
         * Endpoint para obter uma lista de usuários
         */
        .get(passport.auth, controller.list)

router
    .route(`/:id`)
        /**
         * Endpoint para editar um usuário
         */
        .put(passport.auth, controller.update)


module.exports = router

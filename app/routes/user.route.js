const { Router } = require("express")

const { userController } = require("../controllers")


/**
 * @type {Router}
 */
const router = Router()


router
    .route(``)
        /**
         * Endpoint para cadastro de usuários
         */
        .post(userController.register)

        /**
         * Endpoint para obter uma lista de usuários
         */
        .get(userController.list)

router
    .route(`/:id`)
        /**
         * Endpoint para editar um usuário
         */
        .put(userController.update)


module.exports = router

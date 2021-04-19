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



module.exports = router

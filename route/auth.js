const router = require("express").Router()
const validate = require("../middleware/validate")
const Validator = require("../helper/validator")

const auth_controller = require("../controller/auth")

router.post("./signup", validate(Validator.auth.sign_up), auth_controller.sign_up)
router.post("./login", validate(Validator.auth.login), auth_controller.login)

module.exports = router

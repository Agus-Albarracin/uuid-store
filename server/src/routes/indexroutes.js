const { Router } = require("express");
//Cliente/Usuario
const singUpUser = require("../controllers/Users/singUp")

const router = Router()

router.post("/singup", singUpUser)

module.exports = router;

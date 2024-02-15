const { Router } = require("express");
//Cliente/Usuario
const singUpUser = require("../controllers/Users/singUp")
const getProdu = require("../controllers/Productos/getProductos")

const router = Router()

//*Productos
router.get("/getproductos", getProdu)

// router.post("/postproductos", postProdu)
// router.put("/updateproductos", putProdu)
//deberia aplicar borrado logico?
// router.delete("/deleteproductos", deleteProdu) 


//*Usuario/Cliente
// obtiene los datos desde el google
router.post("/singup", singUpUser) 
// Crea el usuario sin google / complemento del google
// router.post("/singupForm", singUpForm) 

// router.get("/getUser", getUser)
// router.put("/updateUser", putUser)
// router.delete("/deleteUser", deleteUser)



//*Carrito
// router.get("/getOrden", getOrden)
// router.post("/createOrden", postOrden)
// router.put("/updateOrden", putOrden)
// router.delete("/deleteOrden", deleteOrden)

module.exports = router;

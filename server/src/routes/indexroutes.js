const { Router } = require("express");
//Cliente/Usuario
const singUpUser = require("../controllers/Users/singUp");
//Productos
const getProdu = require("../controllers/Productos/getProductos");
const postProdu = require("../controllers/Productos/postProductos")
//Carrito
const makePayment = require("../controllers/PasarelaDePagos/makePayment");

const router = Router();

//*Productos
router.get("/getproductos", getProdu.getProductos);
router.get("/getproductosON", getProdu.getProductosON)// endpoint para productos activos
router.get("/getproductos/:id", getProdu.getProductosById);

router.post("/postproductos", postProdu.postProductos)
// router.put("/updateproductos", putProdu)
//deberia aplicar borrado logico?
// router.delete("/deleteproductos", deleteProdu)

//*Usuario/Cliente
// obtiene los datos desde el google
router.post("/singup", singUpUser);
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

router.post("/create_preference", makePayment);

module.exports = router;

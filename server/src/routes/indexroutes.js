const { Router } = require("express");
//Cliente/Usuario
const singUpUser = require("../controllers/Users/singUp");
const getClient = require("../controllers/Users/getUser");
//Productos
const getProdu = require("../controllers/Productos/getProductos");
const postProdu = require("../controllers/Productos/postProductos");
const deleteProdu = require("../controllers/Productos/deleteProductos");
const putProdu = require("../controllers/Productos/putProductos");
//Carrito
const makePayment = require("../controllers/PasarelaDePagos/makePayment");

const router = Router();

//*Productos
router.get("/getproductos", getProdu.getProductos);
router.get("/getproductosON", getProdu.getProductosON); // endpoint para productos activos
router.get("/getproductos/:id", getProdu.getProductosById);

//admin
router.post("/postproductos", postProdu.postProductos);

router.put("/updateproductos/:id", putProdu.updateProductos);

//esta ruta corresponde a una ruta de borrado lógico, a través del estado: activo o inactivo.
router.put("/updatestateproductos/:id", putProdu.borradoLogicoProductos);
//esta ruta corresponde a la ruta para borrado definitivo.
router.delete("/deleteproductos/:id", deleteProdu.deleteProductos);


//*Usuario/Cliente
// Obtiene todos los clientes
router.get("/getclientes", getClient.getAllClient); //endpoint para todos los clientes
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

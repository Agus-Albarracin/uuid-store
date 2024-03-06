const {Carrito} = require("../../db")

const getCarritos = async (req, res) =>{

    try{
    let allCarritos = await Carrito.findAll();
    if(allCarritos.length < 1) return res.status(400).json("No se han realizados compras aún")

    allCarritos = allCarritos.map((carrito) => carrito.get());

    return res.status(200).json(allCarritos)

    }catch(error){
    return res.status(500).json({message: error.message})
    }
}

const getCarritosById = async (req, res) =>{
    const {idDeCompra} = req.body
    try{
        let carritoid = await Carrito.findByPk(idDeCompra)
        if (!carritoid) return res.status(400).json("No hay carrito con ese id")
        carritoid = carritoid.get();

    return res.status(200).json(carritoid)

    }catch(error){

    return res.status(500).json({message: error.message})
    }
}

module.exports = {getCarritos, getCarritosById}
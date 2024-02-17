const {Productos} = require ('../../db');

const postProductos = async(req, res) => {
    try {
        const { nombre, modelo, precio, stock, genero, marca, imagen, estado } = req.body;
        if (!nombre || !modelo|| !precio || !stock || !genero || !marca || !imagen ) return res.status(400).json('Faltan datos');
       
        const allProducts = await Productos.findAll();
        const id = allProducts.length + 1;

        let [producto, exist] = await Productos.findOrCreate({

            where: { nombre },
            defaults: {
            id,
            nombre,
            modelo,
            precio,
            stock,
            genero,
            marca,
            imagen,
            estado,
            }
        });

        res.status(201).json(producto);


    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {postProductos};
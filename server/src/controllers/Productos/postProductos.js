const {Productos} = require ('../../db');

const postProductos = async(req, res) => {
    try {
        const { nombre, modelo, precio, stock, genero, marca, imagen, keyBorradoLogico } = req.body;
        if (!nombre || !modelo|| !precio || !stock || !genero || !marca || !imagen || !keyBorradoLogico ) return res.status(400).json('Faltan datos');
       

        let producto = await Productos.findOrCreate({

            where: { nombre },
            defaults: {
            nombre,
            modelo,
            precio,
            stock,
            genero,
            marca,
            imagen,
            keyBorradoLogico
            }
        });

        res.status(201).json(producto);


    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {postProductos};
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function MisCompras() {
    const user = useSelector((state) => state.actualUser); 
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        console.log(user)
        if (user && user.id) {
            obtenerCarritos(user.id);
        }
    }, [user]); 

    const obtenerCarritos = (userId) => {
    console.log({id: userId})
    axios.post("/getOrden/byuserid", { id: userId }) // siempre que sea post, enviar como objeto el id
    
        .then(response => {
            setCompras(response.data);
        })
        .catch(error => {
            console.error("Error al obtener los carritos:", error);
        });
}
console.log(compras)
return (

    <div className="container mx-auto mt-8 flex justify-center">
   
    <div className="grid grid-cols-1 gap-4">
    <h1 className="text-xl font-bold mb-4">Revisa los detalles de todas tus compras</h1>

    {compras.map(compra => (

        <div key={compra.idDeCompra} className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <img
          id="BannerImage"
          src="https://res.cloudinary.com/do1hcqjpe/image/upload/v1710411864/l9cpejbzcf9f7s39mzvj.png"
          alt="Imagen después de los comentarios"
          className="mx-auto mt-4 w-full cursor-pointer"
        />
            <br></br>
            <h2 className="text-lg font-semibold mb-2 text-red-500">Compra ID: {compra.idDeCompra}</h2>
            <p className="text-gray-600 mb-2">Estado de compra: {compra.estadoDelPedido}</p>
            <p className="text-gray-600 mb-2 text-red-500">Fecha: {new Date(compra.createdAt).toLocaleString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            <ul>
                {compra.productos.map((producto, index) => (
                    <li key={producto.id} className={`flex justify-between ${index !== 0 ? 'mt-2' : ''}`}>
                        <div>
                            <p className="font-semibold">Nombre: {producto.nombre}</p>
                            <p>Cantidad: {producto.cantidad}</p>
                            
                        </div>
                        <p>${producto.precio * producto.cantidad}</p>
                    </li>
                ))}
            </ul>
            <hr className="my-2" />
            <p className="font-semibold text-red-500">Total: ${compra.total}</p>
        </div>
    ))}
    </div>
</div>
);
}

export default MisCompras;


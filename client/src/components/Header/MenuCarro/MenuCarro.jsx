import styles from "./MenuCarro.module.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeToCart } from "../../../redux/actions";
import RedirectButton from "./RedirectButton/RedirectButton";
import { v4 as uuidv4 } from "uuid";

const MenuCarro = ({ mostrarCarro, mostrarUser, emailLocalStorage }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem("user"));
    if (storedUser && storedUser.email) {
      setEmail(storedUser.email);
    }
  }, []);

  const quitarProducto = (item) => {
    dispatch(removeToCart(item));
  };

  const [cantidadProductos, setCantidadProductos] = useState({});

  const incrementarCantidad = (produ) => {
    setCantidadProductos((prevCantidad) => ({
      ...prevCantidad,
      [produ.uuid]: (prevCantidad[produ.uuid] || 0) + 1,
    }));
  };

  const decrementarCantidad = (produ) => {
    if (cantidadProductos[produ.uuid] > 1) {
      setCantidadProductos((prevCantidad) => ({
        ...prevCantidad,
        [produ.uuid]: prevCantidad[produ.uuid] - 1,
      }));
    }
  };

  useEffect(() => {
    cart.forEach((item) => {
      if (!cantidadProductos[item.uuid]) {
        setCantidadProductos((prevCantidad) => ({
          ...prevCantidad,
          [item.uuid]: 1,
        }));
      }
    });
  }, [cart]);

  const calcularTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.precio * (cantidadProductos[item.uuid] || 0);
    });
    return total;
  };

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart.length]);

  return (
    <div className={styles.menuContainer}>
      <div
        className={`${styles.fondo} fixed inset-0 bg-black opacity-100`}
        onClick={() => mostrarCarro(false)}
      ></div>
      <div
        className={`${styles.carro} absolute inset-y-0 right-0 max-w-full flex`}
      >
        <button
          className="bg-gray-800 text-white hover:bg-gray-700"
          onClick={() => mostrarCarro(false)}
        >
          &nbsp;&nbsp;&larr;&nbsp;&nbsp;
        </button>
        <div className="w-auto bg-white p-4">
          <div className="font-bold text-red-600 text-xl  mb-4">MI COMPRA</div>
          {cart.map((produ, index) => (
            <div
              key={index}
              className={`${styles.cartItem} flex items-center justify-between border-b py-2`}
            >
              <img
                src={produ.imagen[0]}
                alt={produ.nombre}
                className="w-24  object-cover rounded"
              />
              <div className="flex-1 ml-4">
                <div className="font-semibold">{produ.nombre}</div>
                <div className="font-semibold">Talle: {produ.talle}</div>
                <div>Precio: ${produ.precio}</div>
                <div>
                  <button onClick={() => decrementarCantidad(produ)}>
                    {" "}
                    restar{" "}
                  </button>
                  &nbsp;&nbsp;{cantidadProductos[produ.uuid] || 1}&nbsp;&nbsp;
                  <button onClick={() => incrementarCantidad(produ)}>
                    {" "}
                    sumar{" "}
                  </button>
                </div>
              </div>
              <button
                onClick={() => quitarProducto(produ.uuid)}
                className="text-red-500 font-bold ml-4"
              >
                Quitar
              </button>
            </div>
          ))}
          <br></br>
          <div className="font-bold text-red-600 text-xl mb-4">
            Total: ${calcularTotal()}
          </div>
          <RedirectButton
            mostrarCarro={mostrarCarro}
            mostrarUser={mostrarUser}
          />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <button
            className=" text-black py-2 rounded-md mt-2"
            onClick={() => mostrarCarro(false)}
          >
            Seguir comprando
          </button>
          <br></br>
          <p>
            Las promociones y costo de envío lo verás aplicado en el checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuCarro;
// // ESTILOS
// import styles from "./MenuCarro.module.scss";

// // HOOKS
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";

// // ACTIONS
// import { removeToCart } from "../../../redux/actions";

// // COMPONENTS
// import RedirectButton from "./RedirectButton/RedirectButton";

// import { v4 as uuidv4 } from "uuid";

// const MenuCarro = ({ mostrarCarro, mostrarUser, emailLocalStorage }) => {
//   // Obtener el estado del carrito desde Redux
//   const cart = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     // Obtener el objeto del usuario almacenado en localStorage
//     const storedUser = JSON.parse(window.localStorage.getItem("user"));

//     // Verificar si se encontró el usuario y si tiene la propiedad email
//     if (storedUser && storedUser.email) {
//       // Obtener y establecer el email del usuario
//       setEmail(storedUser.email);
//     }
//   }, []);

//   const quitarProducto = (item) => {
//     dispatch(removeToCart(item));
//   };

//   const calcularTotal = () => {
//     let total = 0;
//     cart.forEach((item) => {
//       total += item.precio;
//     });
//     return total;
//   };

//   useEffect(() => {
//     window.localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart.length]);

//   return (
//     <div className={styles.menuContainer}>
//       <div
//         className={`${styles.fondo} fixed inset-0 bg-black opacity-100`}
//         onClick={() => mostrarCarro(false)}
//       ></div>

//       <div
//         className={`${styles.carro} absolute inset-y-0 right-0 max-w-full flex`}
//       >
//         <div className="w-auto bg-white p-4">
//           <div className="font-bold text-red-600 text-xl mb-4">CARRITO</div>

//           {cart.map((produ, index) => (
//             <div
//               key={index}
//               className={`${styles.cartItem} flex items-center justify-between border-b py-2`}
//             >
//               <img
//                 src={produ.imagen[0]}
//                 alt={produ.nombre}
//                 className="w-24  object-cover rounded"
//               />
//               <div className="flex-1 ml-4">
//                 <div className="font-semibold">{produ.nombre}</div>
//                 <div>Precio: ${produ.precio}</div>
//                 <div>
//                   Cantidad: {produ.cantidad}
//                   <button onClick={() => incrementarCantidad(produ)}>+</button>
//                   <button onClick={() => decrementarCantidad(produ)}>-</button>
//                 </div>
//               </div>
//               <button
//                 onClick={() => quitarProducto(produ.uuid)}
//                 className="text-red-500 font-bold ml-4"
//               >
//                 Quitar
//               </button>
//             </div>
//           ))}

//           <div className="mt-4 font-bold">Total: ${calcularTotal()}</div>
//           <button
//             className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 mt-2"
//             onClick={() => mostrarCarro(false)}
//           >
//             Cerrar Carrito
//           </button>

//           <RedirectButton
//             mostrarCarro={mostrarCarro}
//             mostrarUser={mostrarUser}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuCarro;

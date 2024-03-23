import styles from "./MenuCarro.module.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeToCart } from "../../../redux/actions";
import RedirectButton from "./RedirectButton/RedirectButton";
import { autoSetCarro } from "../../../redux/actions";
import { v4 as uuidv4 } from "uuid";
import { IoTrash } from "react-icons/io5";

const MenuCarro = ({ mostrarCarro, mostrarUser }) => {
  // const cartJSON = window.localStorage.getItem("cart");
  // const cart = JSON.parse(cartJSON);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (cartJSON) setActualCart(cart);
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart.length]);

  const quitarProducto = (item) => {
    dispatch(removeToCart(item));
  };

  const incrementarCantidad = (produ) => {
    if (produ.cantidad < produ.stock[produ.talle]) {
      cart.forEach((actualProdu) => {
        if (produ.uuid === actualProdu.uuid) {
          actualProdu.cantidad = actualProdu.cantidad + 1;
        }
      });

      dispatch(autoSetCarro(cart));
      // window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const decrementarCantidad = (produ) => {
    if (produ.cantidad > 1) {
      cart.forEach((actualProdu) => {
        if (produ.uuid === actualProdu.uuid) {
          actualProdu.cantidad = actualProdu.cantidad - 1;
        }
      });

      dispatch(autoSetCarro(cart));
      // window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const calcularTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.precio * item.cantidad;
    });
    return total;
  };

  return (
    <div className={styles.menuContainer}>
      <div
        className={`${styles.fondo} fixed inset-0 bg-black opacity-100`}
        onClick={() => mostrarCarro(false)}
      ></div>
      <div
        className={`${styles.carro} absolute inset-y-0 right-0 max-w-full flex`}
      >
        <div className="w-full bg-white p-3 " style={{ height: "85%" }}>
          <div className="font-bold text-red-600 text-xl justify-between flex mb-4">
            <span>MI COMPRA</span>
          </div>
          <div className={styles.productos}>
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
                  <div className="font-bold text-red-700 text-xl">{produ.nombre}</div>

                  <div className="font-bold text-gray-600">Talle:
                    <span className="font-bold text-[#374151] px-2">
                      {produ.talle}
                    </span>
                  </div>
                  <div className="font-bold text-gray-600">Precio:
                    <span className="font-bold text-[#374151] px-2">
                      $ {produ.precio}
                    </span>
                  </div>
                  <div className="font-bold text-gray-600">Cantidad:
                    <span className="px-1">
                    <button className="px-1 text-[#0C78BF]" onClick={() => decrementarCantidad(produ)}>
                       <img 
                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAglJREFUSEvF1kuoTXEUx/HPRQbkEUooj0LEwEQYUaYMTFBKRpSBlBSZyatLSkZMpJQoGWBmQCnyKDMkrzzzGFAmymOv2vt27P7n7L3PPaf7H53dWWt911qt/3/9BozQGRghrqbg0ViJuZiRJ/0Br3Afv+sWUhe8APuxAZPbBP+GqziKl1UJVIHH4Rh2Iqqtc37hOA4ifidPJ/Ac3MCSOrSEzQOsy5L+nPJvB16MO5jSJbRwe49VeFuOkwJPxyPMGia0cH+SdW45frbGS4EvYWOPoEWYU9jdCbwIkWGvTwxZXMGPReByxeezq7C119Q83hEcSIHH4ism9An8GvNS4LW42SdoEXYhnsdHa6u34VwC/B2PGya0DJMSPutxvQzei8GE8W2saQi+hdUJn5jsmPD/Kt6DE30GB+NkGbwZF/vc6k24XAbHurvbsKVNzeMFe1gGx6B9wdSm0Wraf8JM/C2D4/sMttcM1NTsNHa1e7nm41m2S0c1jVphH8okHo+hLZVaEheyS76lx+Cz2Tu9ozVmCjwNscTjUe/FeYoV+FEFjv9DY93rgRAIIRjQd+UKOkmfqPgalnZZdoiJeCKHVmGdigub8TiUT2PdgYvdGwLxcLdirzXBEAj7cnk7sU0HQt5eQezdN1VdqpK3Zf8xuXibXRL0L/KB/FMFbHeP6/oN265pxcMGFgH+AY5VUR8prDrsAAAAAElFTkSuQmCC"
                         style={{ width: '23px', height: '23px', marginTop: '4px'}}

                         alt="Icono" 
                       />
                     </button>

                      <span className="px-1 text-[#374151]" style={{  position: 'relative', top: '-5px' }}>
                       {" "} {produ.cantidad} {" "}
                      </span>
                      <button className="px-1 text-[#0C78BF]" onClick={() => incrementarCantidad(produ)}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAiNJREFUSEvF1kvoTVEUx/HPHxmQRyihPAoRAxNhRJkyMKKUjCQDKSkyk1dIZGQkpUjJADMDSpFHmSF55ZnHgDJRHnfVOf+O0zl3n3v+/9t/j+7trLW/e61+e6/fgBFaAyPE1St4NFZiLmZkh/6AV7iP300LaQpegH3YgMk1m3/DVRzBy9QBUuBxOIodiGqbrF84jgOI35WrG3gObmBJE1pFzAOs6xz6c1V+HXgx7mBKS2ie9h6r8La8TxV4Oh5h1hChefqTTueW42dxvyrwJWxMQL/jcRazDJMS8aexqxt4UQcaJ0yt21iTBd3C6kRCiCyu4Mc8rlzx+c5V2JKioldwbHkY+6vAY/EVE/oEfo15VeC1uNkAGiFtKo68hXgeP4qt3opzFeCikPLPIaxcLKcQAiuuOsGtx/UyeA+OVYCL1TVsiDrBxWFD4f9VvBsn+gwOxskyeBMu9rnV8T5cLoNj3N1t2Mu24ooX7GEZHEL7gqkN4G3AnzATf8vg+H8W2/oEPoOddS/XfDzrzNJRCXivFYczicdjcEpVDYkLnUu+OQHudUhEJ7cX96wCT0MM8XjUh2M9xQr8SIHje3ise8NgBMIIBvRduYJu1icqvoalLcsOMxFP5OAobFJxHjMeBzM1pgSX58TsDYN4qK3ZKx4wDMLezN5OrOlA2Nsr2dx9k+pSyt6W88dk5m12ydC/yAT5JwWsu8dN84Yc12vFQwbmG/wDmONpH9S+OtIAAAAASUVORK5CYII="
                          style={{ width: '23px', height: '23px', marginTop: '4px', marginLeft: '4px'  }} 
                          alt="Icono" 
                          />
                      </button>
                    </span>
                  </div>
                </div>
                <button onClick={() => quitarProducto(produ.uuid)}
                  className="text-red-500 font-bold text-3xl ml-4"
                >
                  <IoTrash />
                </button>
              </div>
            ))}
          </div>
          <br></br>
          <div className="font-bold text-red-600 text-xl mb-4">
            Total: ${calcularTotal()}
          </div>
          <RedirectButton
            mostrarCarro={mostrarCarro}
            mostrarUser={mostrarUser}
          />
          <button
            className=" text-black py-2 rounded-md mt-2"
            onClick={() => mostrarCarro(false)}
          >
            haz click fuera del carro para seguir comprando
          </button>
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

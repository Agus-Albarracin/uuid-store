import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, getProductos, filterProducto, filterProducto2 } from '../../redux/actions';
import './SideBar.css';

function SideBar({ handleChange, handleSubmit }) {
  const dispatch = useDispatch();
  const allProductos = useSelector((state) => state.allProductosAux);

  function selectProducto(e) {
    dispatch(filterProducto(e.target.value, e.target.name));
  }

  function selectProducto2(e) {
    dispatch(filterProducto2(e.target.value, e.target.name));
  }

  function selectOrd(e) {
    dispatch(getOrder(e.target.value));
  }

  useEffect(() => {
    if (allProductos.length === 0) {
      dispatch(getProductos());
    }
  }, [dispatch, allProductos.length]);

  return (
    <div className="container-side p-4 border-r border-gray-300">
      <div className="search-box mb-4">
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <input
            className="border rounded p-2 focus:outline-none focus:border-blue-500"
            placeholder="Buscar"
          />
          <button
            type="submit"
            className="ml-2 bg-red-500 text-white p-2 rounded focus:outline-none hover:bg-red-700"
          >
            Buscar
          </button>
        </form>
      </div>

      <div className="mb-4">
        <label htmlFor="marca" className="block font-bold mb-2">
          Marca
        </label>
        <select
          id="marca"
          className="border rounded p-2 w-full focus:outline-none focus:border-blue-500"
          onChange={selectProducto}
        >
          <option value="" hidden></option>
          <option value="All">All</option>
          {allProductos.map((prod) => (
            <option key={prod.id} value={prod.marca}>
              {prod.marca}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="genero" className="block font-bold mb-2">
          Género
        </label>
        <select
          id="genero"
          className="border rounded p-2 w-full focus:outline-none focus:border-blue-500"
          onChange={selectProducto2}
        >
          <option value="" hidden></option>
          <option value="All">All</option>
          {allProductos.map((prod) => (
            <option key={prod.id} value={prod.genero}>
              {prod.genero}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="precio" className="block font-bold mb-2">
          Precio
        </label>
        <select
          id="precio"
          className="border rounded p-2 w-full focus:outline-none focus:border-blue-500"
          onChange={selectOrd}
        >
          <option value="" hidden></option>
          <option value="As">Mayor Precio</option>
          <option value="Ds">Menor Precio</option>
        </select>
      </div>
    </div>
  );
}

export default SideBar;

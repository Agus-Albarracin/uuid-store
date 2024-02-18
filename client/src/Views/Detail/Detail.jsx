import style from "./Detail.module.css";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux"; // Cambiado a useDispatch

import { getDetail } from "../../redux/actions";

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch(); // Cambiado a useDispatch
    const detail = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getDetail(id));
        // return () => {
        //     console.log(detail);
        //     dispatch(clearDetail());
        // };
    }, [dispatch, id]); 

    return (
      <div className={style.container}>
        <button className={style.buttonVolver}>
          <Link to="/productos">Volver</Link>
        </button>
        <div className={style.card}>
          <h1 className={style.name}>{detail?.nombre}</h1>
          <ul className={style.info}>
            <li>Precio: {detail?.precio}</li>
            <li>Modelo: {detail?.modelo}</li>
            {/* <li>Stock: {detail?.stock}</li> */}
            <li>Genero: {detail?.genero}</li>
            <li>Marca: {detail?.marca}</li>
          </ul>
        </div>
      </div>
    );
};

export default Detail;

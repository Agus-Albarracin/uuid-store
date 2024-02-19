import style from "./Detail.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux"; // Cambiado a useDispatch

import { getDetail } from "../../redux/actions";
import BotonDet from '../../components/Button/Button';

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
  const images = [
    'https://images.pexels.com/photos/1777467/pexels-photo-1777467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg?auto=compress&cs=tinysrgb&w=600',
  ];


  return (
    <div>

      <div className={style.card}>
        <div className={style.productDetail}>
          {images.map((url, index) => (
            <div key={index} className={index % 3 === 2 ? style.largeImage : style.smallImage}>
              <img src={url} alt={`Product Image ${index + 1}`} />
            </div>
          ))}
        </div>
        <div>
          <BotonDet to={`/productos`}>volver</BotonDet>
          {/* <h1 className={style.name}>{detail?.nombre}</h1> */}

          <div className={style.details}>
            <h1 className={style.name}>{detail?.nombre}</h1>
            <table className={style.infoTable}>
              <tbody>
                <tr>
                  <td>Precio:</td>
                  <td>{detail?.precio}</td>
                </tr>
                <tr>
                  <td>Modelo:</td>
                  <td>{detail?.modelo}</td>
                </tr>
                {/* <tr>
                  <td>Stock:</td>
                  <td>{detail?.stock}</td>
                </tr> */}
                <tr>
                  <td>Género:</td>
                  <td>{detail?.genero}</td>
                </tr>
                <tr>
                  <td>Marca:</td>
                  <td>{detail?.marca}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <BotonDet to={`/#`}>Agregar al carrito</BotonDet>
  
        </div>

      </div>

    </div>


  );
};

export default Detail;

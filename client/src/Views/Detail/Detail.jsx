import style from "./Detail.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux"; // Cambiado a useDispatch

import { getDetail } from "../../redux/actions";
import BotonDet from '../../components/Button/Button';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"

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

  const img = [{
    original: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    original: 'https://images.pexels.com/photos/1461048/pexels-photo-1461048.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/1461048/pexels-photo-1461048.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    original: 'https://images.pexels.com/photos/11135667/pexels-photo-11135667.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/11135667/pexels-photo-11135667.jpeg?auto=compress&cs=tinysrgb&w=600'
  }]
  return (
    <div >

      <div className={style.card}>
        <div className={style.gallery}>
          <ImageGallery items={img} 
            showPlayButton={false}
            showFullscreenButton={false}
            showIndex={false}
            showNav={false}
            showBullets={false}
            autoPlay={false}
            thumbnailPosition="left"
            thumbnailWidth ={1}
            
          
            // showThumbnails={false}
          />
        </div>
        <div className={style.description}>
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

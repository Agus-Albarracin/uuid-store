import React, { useEffect, useRef, useState } from 'react';
import styles from './Carrusel.module.scss';  
import { data } from '../../../assets/data';


// ...

const Carrusel = () => {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll("li > img")[currentIndex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [currentIndex]);

  const scrollToImage = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((curr) => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? 0 : curr - 1;
      });
    } else {
      const isLastSlide = currentIndex === data.length - 1;
      if (!isLastSlide) {
        setCurrentIndex((curr) => curr + 1);
      }
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const handleImageClick = () => {
    // Redirige a la página de productos cuando se hace clic en la imagen
    // Puedes ajustar la URL según tu configuración de enrutamiento
    window.location.href = '/productos';
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.sliderContainer}>
        <div className={styles.leftArrow} onClick={() => scrollToImage('prev')}>&#10092;</div>
        <div className={styles.rightArrow} onClick={() => scrollToImage('next')}>&#10093;</div>
        <div className={styles.containerImages}>
          <ul ref={listRef} className={styles.imageList}>
            {data.map((item, idx) => (
              <li key={idx} className={styles.imageItem}>
                <img
                  src={item.imgUrl}
                  alt={`slide-${item.id}`}
                  className={styles.image}
                  onClick={handleImageClick}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.dotsContainer}>
          {data.map((_, idx) => (
            <div
              key={idx}
              className={`${styles.dotContainerItem} ${idx === currentIndex ? styles.active : ""}`}
              onClick={() => goToSlide(idx)}
            >
              &#9865;
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carrusel;

import styles from "./Reviews.module.scss";

const Review = ({ puntuaciones }) => {
  return (
    <div className={styles.reviews}>
      {puntuaciones.map((review, index) => {
        return (
          <div className={styles.review} key={index}>
            <h2>
              <strong>{review.usuario}</strong>
            </h2>
            <div>
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={`${styles.estrella} ${
                    value <= review.puntuacion
                      ? styles.estrellaA
                      : styles.estrellaN
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span>{review.comentario}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Review;

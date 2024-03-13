const validate = (values) => {
  let errors = {};

  if (!values.puntuacion)
    errors = { ...errors, puntuacion: "La puntuación no puede ser 0" };
  if (!values.comentario)
    errors = { ...errors, comentario: "El comentario no puede estar vacio" };

  return errors;
};

export default validate;

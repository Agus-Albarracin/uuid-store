const validate = (values) => {
    let errors = {};

    const regexCaracteresValidos = /^[a-zA-Z0-9\s.,]*$/;

    if(!regexCaracteresValidos.test(values.direccion)) errors = {...errors, direccion: "El campo ingresado no es válido"};
    if(!regexCaracteresValidos.test(values.provincia)) errors = {...errors, provincia: "El campo ingresado no es válido"};
    if(!regexCaracteresValidos.test(values.localidad)) errors = {...errors, localidad: "El campo ingresado no es válido"};
    if(!regexCaracteresValidos.test(values.codigoPostal)) errors = {...errors, codigoPostal: "El campo ingresado no es válido"};

    return errors;
}

export default validate;
const validate = values => {
    let errors = {};

    if(!values.nombre) errors = {...errors, nombre: "Campo obligatorio!"};
    if(!values.apellido) errors = {...errors, apellido: "Campo obligatorio!"};
    if(!values.email) errors = {...errors, email: "Campo obligatorio!"};
    if(!values.dni) errors = {...errors, dni: "Campo obligatorio!"};
    if(!values.telefeno) errors = {...errors, telefeno: "Campo obligatorio!"};

    return errors;
}

export default validate;
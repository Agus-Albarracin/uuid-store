const validate = valores => {
    const errors = {};

    if(!valores.nombre){
        errors.nombre = "Campo obligatorio"
    }

    if(!valores.marca){
        errors.marca = "Campo obligatorio"
    }

    if(!valores.modelo){
        errors.modelo = "Campo obligatorio"
    }

    if(!valores.precio){
        errors.precio = "Campo obligatorio"
    }else if(typeof Number(valores.precio) !== 'number'){
        errors.precio = "El precio tiene que ser un número"
    }

    if(valores.imagenes.length === 0){
        errors.imagenes = "Se debe insertar una imagen como mínimo"
    }

    return errors;
}

export default validate;
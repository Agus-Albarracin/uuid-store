const validation = valores => {
    const errores = {};

    if(!valores.marca){
        errores.marca = "Campo obligatorio"
    }

    if(!valores.modelo){
        errores.modelo = "Campo obligatorio"
    }
}
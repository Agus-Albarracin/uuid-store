

const Confirmacion = ({ userBuyData }) => {
    return (
        <div>
            <span> { userBuyData.nombre } </span>
            <span> { userBuyData.apellido } </span>
            <span> { userBuyData.email } </span>
            <span> { userBuyData.dni } </span>
            <span> { userBuyData.telefono } </span>
            <span> { userBuyData.provincia } </span>
            <span> { userBuyData.localidad } </span>
            <span> { userBuyData.direccion } </span>
            <span> { userBuyData.codigoPostal } </span>
            <span> { userBuyData.metodoDeEnvio } </span>
        </div>
    )
}

export default Confirmacion;
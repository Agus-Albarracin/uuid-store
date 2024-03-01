const Confirmacion = ({ userBuyData }) => {
  return (
    <div>
      <div>
        <h2> Tus Datos </h2>
        <span> {userBuyData.nombre} </span>
        <span> {userBuyData.apellido} </span>
        <span> {userBuyData.email} </span>
        <span> {userBuyData.dni} </span>
        <span> {userBuyData.telefono} </span>
      </div>

      <div>
        <h2> Datos de envío </h2>
        <span> {userBuyData.provincia} </span>
        <span> {userBuyData.localidad} </span>
        <span> {userBuyData.direccion} </span>
        <span> {userBuyData.codigoPostal} </span>
        <span> {userBuyData.metodoDeEnvio} </span>
      </div>
    </div>

    // ACA VA EL BOTON PARA HACER EL PAGO
  );
};

export default Confirmacion;

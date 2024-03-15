import { useSelector } from "react-redux";
import { useState } from "react";
import InfoUser from "../../components/InfoUser/InfoUser";
import MisCompras from "../../components/MisCompras/MisCompras";

import "./DataUser.css";

function DataUser() {
  const user = useSelector((state) => state.actualUser);
  console.log(user);

  const [view, setView] = useState("info");

  const handleView = (option) => {
    setView(option);
  };

  return (
    <div>
      <div className="contenedor">
        <div className="contenedor3">
          <div className="card1">
            <h1>Hola! {user.nombre}</h1>
          </div>

          <div className="card" onClick={() => handleView("info")}>
            <span>
              <strong>Informacion Personal</strong>
            </span>
          </div>

          <div className="card" onClick={() => handleView("compras")}>
            <span>
              <strong>Mis compras</strong>
            </span>
          </div>
        </div>

        {view === "info" && (
          <article className="contenedor2">
            <strong>
              <h1> -INFORMACION PERSONAL- </h1>
            </strong>
            <InfoUser />
          </article>
        )}

        {view === "compras" && (
          <article className="contenedor2">
            <strong>
              <h2> MIS COMPRAS </h2>
            </strong>
            <MisCompras />
          </article>
        )}
      </div>
    </div>
  );
}

export default DataUser;

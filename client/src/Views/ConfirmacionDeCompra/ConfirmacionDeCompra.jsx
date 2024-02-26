import { useState } from "react";

import UserData from "./UserData/UserData";

const ConfirmacionDeCompra = () => {

    const [ view, setView ] = useState(1);

    const handleView = (option) => {
        setView(option);
    }

    return (
        <section>
            <h2>CONFIRMACION DE LA COMPRA</h2>
            <div>
                <ul>
                    <li onClick={() => { handleView(1) }} ><strong>1.</strong> Tus datos </li>
                    <li onClick={() => { view > 2 && handleView(2) }} ><strong>2.</strong> Dirección de envío </li>
                    <li onClick={() => { view > 3 && handleView(3) }} ><strong>3.</strong> Método de envío </li>
                    <li onClick={() => { view > 4 && handleView(4) }} ><strong>4.</strong> Confirmación de compra </li>
                </ul>
            </div>

            <div>
                {
                    view === 1 && <UserData/>
                }

                {
                    view === 2 && <div> como </div>
                }

                {
                    view === 3 && <div> estas </div>
                }

                {
                    view === 4 && <div> estas </div>
                }
            </div>
        </section>
    )
};

export default ConfirmacionDeCompra;

import "./OrdenCompra.css"

function OrdenCompra(){
    return(
        <div>
           
            <div className="contenedor-table">
                <table>
                    <thead>
                    <tr>
                        <th> N° de Orden</th>
                        <th> Producto </th>
                        <th> Usuario </th>
                        <th> Direccion </th>
                        <th> Estado </th>
                    </tr>
                    </thead>
                    
                    <tbody>
                    
                    <tr>
                        <td>Celda 1</td>
                        <td>Celda 2</td>
                        <td>Celda 3</td>
                    </tr>
                    <tr>
                        <td>Celda 4</td>
                        <td>Celda 5</td>
                        <td>Celda 6</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrdenCompra;
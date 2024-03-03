import React from "react";
import { useSelector } from "react-redux";


const AllUsers = () => {

    const users = useSelector((state) => state.allUsers);

    return (
        <div className="contenedor-table">
                <table>
                    <thead>
                        <tr>
                            <th> Nombre </th>
                            <th> Email </th>
                            <th> Accion </th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        { users.map ( (user) => {
                            <tr>
                                <td>{user.nombre}</td>
                                <td>{user.email}</td>
                                <td><button> Eliminar </button></td>
                                
                            </tr>
                            }

                        )}
                                           
                    </tbody>
                    
                </table>
                
            </div>
            
    )
    
}

export default AllUsers;
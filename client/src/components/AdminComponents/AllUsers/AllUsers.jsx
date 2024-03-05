import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { allUsers } from "../../../redux/actions";


const AllUsers = () => {
    
    const users = useSelector((state) => state.allUsers);
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(allUsers())
    },[])

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
                            <tr key={user.id}>
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
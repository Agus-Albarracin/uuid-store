import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, deleteUser, accessAdminUser } from "../../../redux/actions";
import UserAdminSwitch from "./UserAdminSwitch";
import Switch from "react-switch";


const AllUsers = () => {
  const users = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  const handleDeleteUser = (email) => {
    console.log("Correo electrónico del usuario a eliminar:", email);
    dispatch(deleteUser(email));
  };

  const handleAdminUser = (email, admin) => {
    console.log(`Se ha modificado el acceso admin del mail ${email}`);
        dispatch(accessAdminUser(email));
  };



  return (
    <div className="contenedor-table">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Eliminar</th>
            <th>Permisos de admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            
            <tr key={user.id}>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.email)}>Eliminar</button>
              </td>
              <td>
                <button onClick={() => handleAdminUser(user.email , user.admin)}><UserAdminSwitch isAdmin={user.admin}></UserAdminSwitch></button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;

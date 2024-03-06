import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allUsers, deleteUser } from "../../../redux/actions";

const AllUsers = () => {
  const users = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUsers());
  }, []);

  const handleDeleteUser = (email) => {
    console.log("Correo electrónico del usuario a eliminar:", email);
    dispatch(deleteUser(email)); 
  };

  return (
    <div className="contenedor-table">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acción</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
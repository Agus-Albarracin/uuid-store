import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, deleteUser, accessAdminUser } from "../../../redux/actions";
import UserAdminSwitch from "./UserAdminSwitch";

const AllUsers = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [searchID, setsearchID] = useState("");
  const users = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  console.log(users)
  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  const handleDeleteUser = async (email) => {
    try {
      await dispatch(deleteUser(email));
      console.log("Correo electrónico del usuario a eliminar:", email);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };
  
  const handleAdminUser = async (email, admin) => {
    try {
      await dispatch(accessAdminUser(email));
      console.log(`Se ha modificado el acceso admin del mail ${email}`);
    } catch (error) {
      console.error("Error al modificar los permisos de administrador:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const emailMatch = user.email.toLowerCase().includes(searchEmail.toLowerCase());
    const nombreMatch = user.nombre !== null && user.nombre.toLowerCase().toString().includes(searchID);
    return emailMatch && nombreMatch;
  });

  return (
    <div className="container mx-auto mt-8 flex justify-center">
      <div className="overflow-x-auto">
        <div className="flex mb-4">
          <div>
            <input
              type="text"
              placeholder="Buscar nombre"
              value={searchID}
              onChange={(e) => setsearchID(e.target.value)}
              className="border px-2 py-2 mr-4"
              style={{ width: "15ch" }}
            />
            <input
              type="text"
              placeholder="Buscar por email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="border px-3  py-2"
            />
          </div>
        </div>
        <table className="table-auto min-w-full">
          <thead>
            <tr className="bg-red-500 text-white">
              <th className="px-4 py-2">nombre</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Eliminar</th>
              <th className="px-4 py-2">Permisos de admin</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.nombre}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteUser(user.email)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleAdminUser(user.email, user.admin)}
                    className="px-3 py-1 rounded mx-auto"
                  >
                    <UserAdminSwitch isAdmin={user.admin}></UserAdminSwitch>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

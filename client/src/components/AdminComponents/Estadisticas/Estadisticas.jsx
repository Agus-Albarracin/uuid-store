import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VictoryLine, VictoryChart, VictoryLabel } from 'victory';
import { allUsers, getOrdenes } from '../../../redux/actions'; // Importa la acción para obtener usuarios

const Estadisticas = () => {
  const dispatch = useDispatch();
  const [userStats, setUserStats] = useState([]);
  const [orderStats, setOrderStats] = useState([]);

  useEffect(() => {
    // Llama a las acciones para obtener usuarios y órdenes cuando el componente se monta
    dispatch(allUsers());
    dispatch(getOrdenes());
  }, [dispatch]);

  const users = useSelector(state => state.allUsers);
  const ordenes = useSelector(state => state.allOrdenes);

  useEffect(() => {
    // Procesa la información de usuarios para generar estadísticas
    if (users && users.length > 0) {
      setUserStats(groupByDay(users));
      console.log("Users:", users); // Agregar console.log para imprimir users en la consola
      console.log("User Stats:", userStats); // Agregar console.log para imprimir userStats en la consola
    }
  }, [users]);

  useEffect(() => {
    // Procesa la información de órdenes para generar estadísticas
    if (ordenes && ordenes.length > 0) {
      setOrderStats(groupByDay(ordenes));
      console.log("Ordenes:", ordenes); // Agregar console.log para imprimir ordenes en la consola
      console.log("Order Stats:", orderStats); // Agregar console.log para imprimir orderStats en la consola
    }
  }, [ordenes]);

  // Función para agrupar la información por día y calcular el promedio
  const groupByDay = (data) => {
    const groupedData = {};
    data.forEach(item => {
      const date = new Date(item.createdAt).toLocaleDateString();
      if (!groupedData[date]) {
        groupedData[date] = 0;
      }
      groupedData[date]++;
    });

    const averages = [];
    for (const date in groupedData) {
      if (groupedData.hasOwnProperty(date)) {
        averages.push({ x: date, y: groupedData[date] });
      }
    }
    return averages;
  };

  return (
    <div>
      <h2>Promedio de Usuarios Registrados por Día</h2>
      <VictoryChart width={400} height={400}>
        <VictoryLine
          data={userStats}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          labelComponent={<VictoryLabel angle={45} />}
        />
      </VictoryChart>
      <h2>Promedio de Compras por Día</h2>
      <VictoryChart width={400} height={400}>
        <VictoryLine
          data={orderStats}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          labelComponent={<VictoryLabel angle={45} />}
        />
      </VictoryChart>
    </div>
  );
};

export default Estadisticas;

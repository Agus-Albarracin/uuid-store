import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VictoryBar, VictoryAxis, VictoryChart, VictoryLabel } from 'victory';
import { allUsers, getOrdenes } from '../../../redux/actions';

const Estadisticas = () => {
  const dispatch = useDispatch();
  const [userStats, setUserStats] = useState([]);
  const [orderStats, setOrderStats] = useState([]);

  useEffect(() => {
    dispatch(allUsers());
    dispatch(getOrdenes());
  }, [dispatch]);

  const users = useSelector(state => state.allUsers);
  const ordenes = useSelector(state => state.allOrdenes);

  useEffect(() => {
    if (users && users.length > 0) {
      setUserStats(calculateUserCountsByMonth(users));
    }
  }, [users]);

  useEffect(() => {
    if (ordenes && ordenes.length > 0) {
      setOrderStats(calculateOrderCountsByMonth(ordenes));
    }
  }, [ordenes]);

  const calculateUserCountsByMonth = (data) => {
    const monthlyCounts = Array.from({ length: 12 }, () => 0);

    data.forEach(user => {
      const monthIndex = new Date(user.createdAt).getMonth();
      monthlyCounts[monthIndex]++;
    });

    return monthlyCounts;
  };

  const calculateOrderCountsByMonth = (data) => {
    const monthlyCounts = Array.from({ length: 12 }, () => 0);

    data.forEach(order => {
      const monthIndex = new Date(order.createdAt).getMonth();
      monthlyCounts[monthIndex]++;
    });

    return monthlyCounts;
  };

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  return (
    <div>
      <h2>Número de Usuarios Registrados por Mes</h2>
      <VictoryChart domainPadding={{ x: 20 }} height={300} width={600}>
        <VictoryAxis
          tickValues={monthNames.map((month, index) => index + 1)}
          tickFormat={monthNames}
          style={{ tickLabels: { angle: -45, textAnchor: 'end', fontSize: 8 } }}
        />
        <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}`} tickValues={[...Array(7).keys()].map(x => x * 15)} />

        <VictoryBar
          data={monthNames.map((month, index) => ({ x: index + 1, y: userStats[index] || 0 }))}
          labels={({ datum }) => `${datum.y}`}
          labelComponent={<VictoryLabel dy={-5} />}
          style={{ data: { fill: "#c43a31" } }} // Color rojo para las barras de usuarios
        />
      </VictoryChart>
      
      <h2>Número de Órdenes Creadas por Mes</h2>
      <VictoryChart domainPadding={{ x: 20 }} height={300} width={600}>
        <VictoryAxis
          tickValues={monthNames.map((month, index) => index + 1)}
          tickFormat={monthNames}
          style={{ tickLabels: { angle: -45, textAnchor: 'end', fontSize: 8 } }}
        />
        <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}`} tickValues={[...Array(7).keys()].map(x => x * 15)} />
        <VictoryBar
          data={monthNames.map((month, index) => ({ x: index + 1, y: orderStats[index] || 0 }))}
          labels={({ datum }) => `${datum.y}`}
          labelComponent={<VictoryLabel dy={-5} />}
          style={{ data: { fill: "#007acc" } }} // Color azul para las barras de órdenes
        />
      </VictoryChart>
    </div>
  );
};

export default Estadisticas;

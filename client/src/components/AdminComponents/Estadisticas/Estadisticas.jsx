import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VictoryBar, VictoryAxis, VictoryChart, VictoryLabel, VictoryPie } from 'victory';
import { allUsers, getOrdenes, getProductosAll } from '../../../redux/actions';

const Estadisticas = () => {
  const dispatch = useDispatch();
  const [userStats, setUserStats] = useState([]);
  const [orderStats, setOrderStats] = useState([]);
  const [produStats, setProduStats] = useState([]);
  
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(allUsers());
      await dispatch(getOrdenes());
      await dispatch(getProductosAll());
    };
  
    fetchData();
  }, [dispatch]);
  
  const users = useSelector(state => state.allUsers);
  const ordenes = useSelector(state => state.allOrdenes);
  const allprodu = useSelector(state => state.allProductosAdmin)
  console.log(allprodu)
  
  useEffect(() => {
    if (users && users.length > 0 && ordenes && ordenes.length > 0) {
      setUserStats(calculateUserCountsByMonth(users));
      setOrderStats(calculateOrderCountsByMonth(ordenes));
    }
  }, [users, ordenes]);
  
  const calculateUserCountsByMonth = (data) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const monthlyCounts = Array.from({ length: 12 }, () => 0);
  
    data.forEach(user => {
      const userDate = new Date(user.createdAt);
      const userMonth = userDate.getMonth();
      if (userDate.getFullYear() === currentDate.getFullYear()) {
        monthlyCounts[userMonth]++;
      }
    });
  
    return monthlyCounts;
  };

  const calculateOrderCountsByMonth = (data) => {
    const monthlyCounts = Array.from({ length: 12 }, () => ({ count: 0, total: 0 }));

    data.forEach(order => {
      const monthIndex = new Date(order.createdAt).getMonth();
      monthlyCounts[monthIndex].count++;
      monthlyCounts[monthIndex].total += Number(order.total);
    })
    return monthlyCounts;
  };
  

  return (
    <div>
      <br /><br /><br /><br />
      <h2 style={{fontWeight: "bold", fontSize: "40px", color: "green"}}>Dinero Total Recibido por Mes</h2>
      <VictoryChart domainPadding={{ x: 20 }} height={300} width={600}>
        <VictoryAxis
          tickValues={monthNames.map((month, index) => index + 1)}
          tickFormat={monthNames}
          style={{ tickLabels: { angle: -45, textAnchor: 'end', fontSize: 8 } }}
        />

        <VictoryAxis dependentAxis tickFormat={(tick) => `$${tick}`} tickValues={[...Array(7).keys()].map(x => x * 1000)} />
        <VictoryBar
          data={monthNames.map((month, index) => ({ x: index + 1, y: orderStats[index]?.total || 0 }))}
          labels={({ datum }) => `$${datum.y}`}
          labelComponent={<VictoryLabel dy={-5} />}
          style={{ data: { fill: "green" } }} 
        />
      </VictoryChart>

      <br /><br /><br /><br />
      <h2 style={{fontWeight: "bold", fontSize: "40px", color: "#007acc" }}>Número de Ordenes Creadas por Mes</h2>

      <VictoryChart domainPadding={{ x: 20 }} height={300} width={600}>
        <VictoryAxis
          tickValues={monthNames.map((month, index) => index + 1)}
          tickFormat={monthNames}
          style={{ tickLabels: { angle: -45, textAnchor: 'end', fontSize: 8 } }}
        />
        <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}`} tickValues={[...Array(7).keys()].map(x => x * 15)} />
        <VictoryBar
          data={monthNames.map((month, index) => ({ x: index + 1, y: orderStats[index]?.count || 0 }))}
          labels={({ datum }) => `${datum.y}`}
          labelComponent={<VictoryLabel dy={-5} />}
          style={{ data: { fill: "#007acc" } }} 
        />
      </VictoryChart>


      <br /><br /><br /><br />
      <h2 style={{fontWeight: "bold", fontSize: "40px", color: "#c43a31" }}>Número de Usuarios Registrados por Mes</h2>

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
          style={{ data: { fill: "#c43a31" } }} 
        />
      </VictoryChart>
      
     
    </div>
  );
};

export default Estadisticas;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VictoryBar, VictoryAxis, VictoryChart, VictoryLabel, VictoryPie } from 'victory';
import { allUsers, getOrdenes } from '../../../redux/actions';

const Estadisticas = () => {
  const dispatch = useDispatch();
  const [userStats, setUserStats] = useState([]);
  const [orderStats, setOrderStats] = useState([]);
  
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  useEffect(() => {
    dispatch(allUsers());
    dispatch(getOrdenes());
  }, [dispatch]);
  
  const users = useSelector(state => state.allUsers);
  const ordenes = useSelector(state => state.allOrdenes);
  const allprodu = useSelector(state => state.allProductosAdmin)
  console.log(allprodu)

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

  const sortedProducts = allprodu.filter(product => product.quantitysold)
                                    .sort((a, b) => b.quantitysold - a.quantitysold);
  
  const topProducts = sortedProducts.slice(0, 10);

  const chartData = topProducts.map(product => ({ x: product.nombre, y: product.quantitysold }));

  // Función para renderizar el indicador de etiqueta personalizado
  const renderCustomLabelIndicator = ({ x, y, datum }) => {
    // Puedes personalizar la línea de indicador aquí según tus necesidades
    return (
      <LineSegment
        from={{ x: x - 10, y }}
        to={{ x: x + 10, y }}
        style={{ stroke: 'black', strokeWidth: 1 }}
      />
    );
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

      <h2 style={{ fontWeight: "bold", fontSize: "40px", color: "#007acc" }}>Top 10 de Productos Más Vendidos</h2>
      <VictoryPie
        data={chartData}
        colorScale="qualitative"
        labels={({ datum }) => `${datum.x}: ${datum.y}`}
        labelComponent={<VictoryLabel dy={0} />}
        height={400}
        width={600}
        labelIndicator={(props) => renderCustomLabelIndicator(props)} // Utiliza tu función de renderizado personalizado
      />
    </div>
  );
};

export default Estadisticas;

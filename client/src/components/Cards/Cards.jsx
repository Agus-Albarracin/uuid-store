import Card from "../Card/Card";
import "./Cards.css";

function Cards({ data }) {

  
  const productosList = Array.isArray(data) ? data : [];

  return productosList.length === 0 ? null : (
    <div className="cards-container">
      {productosList.map((producto) => (
        <Card producto={producto} key={producto.id} />
      ))}
    </div>
  );

}

export default Cards;

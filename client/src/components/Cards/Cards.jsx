import Card from "../Card/Card";
import "./Cards.css";

function Cards({ data }) {


  const productosList = Array.isArray(data) ? data : [];

  return productosList.length === 0 ? null : (
    <div className="flex flex-wrap gap-4">
      {productosList.map((producto) => (
        <div key={producto.id} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4">
          <Card producto={producto} />
        </div>
      ))}
    </div>
  );

}

export default Cards;

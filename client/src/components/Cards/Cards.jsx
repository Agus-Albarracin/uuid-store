import Card from "../Card/Card";
import "./Cards.css";

function Cards({ data }) {
  const productosList = Array.isArray(data) ? data : [];

  return productosList.length === 0 ? null : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
      {productosList.map((producto) => (
        <div key={producto.id} className="flex-shrink-0 w-full">
          <Card producto={producto} />
        </div>
      ))}
    </div>
  );
}

export default Cards;

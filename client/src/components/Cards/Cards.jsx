import Card from "../Card/Card";
import "./Cards.css";

function Cards({ data }) {

    const productosList = data;

    return (
        <div className="cards-container" >
            {
                productosList?.map(producto => <Card producto={producto} key={producto.name} />)
            }
        </div>
    );
}

export default Cards;
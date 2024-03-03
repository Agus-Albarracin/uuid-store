import { useNavigate } from "react-router-dom";

const RedirectButton = ({ mostrarUser, mostrarCarro }) => {

    const navigate = useNavigate();

    const userJson = window.localStorage.getItem('loggedUser');

    const handleRedirect = () => {
        if(userJson){
            navigate('/confirmacionDeCompra');
            mostrarCarro();
        }else{
            mostrarUser();
            mostrarCarro();
        }
    }

    return (
        <button onClick={handleRedirect}>
            Confirmar compra
        </button>
    )
}

export default RedirectButton;
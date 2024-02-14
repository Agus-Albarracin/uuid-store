import { Link } from 'react-router-dom';

// estilos
import styles from './Nav.module.scss';

// iconos y logos
import logo from '../../assets/uuid-logo.png';
import iconoCarro from '../../assets/carro.png';
import iconoUser from '../../assets/persona.png';


const Nav = () => {
    return (
        <nav className={styles.nav}>
            <Link to='/home'> 
                <img src={logo} alt="logo" className={styles.logo} /> 
            </Link>

            <span>
                <Link to='/home'> HOME </Link>
                <Link to='/productos' > TODOS LOS PRODUCTOS </Link>
            </span>

            <span>
                <img src={iconoCarro} alt="carrito de compras" />
                <img src={iconoUser} alt="icono de usuario" />
            </span>
        </nav>
    )
}

export default Nav;
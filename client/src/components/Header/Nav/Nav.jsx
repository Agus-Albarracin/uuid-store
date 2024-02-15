import { Link } from 'react-router-dom';

// estilos
import styles from './Nav.module.scss';

// iconos y logos
import logo from '../../../assets/uuid-logo.png';
import iconoCarro from '../../../assets/carro.png';
import iconoUser from '../../../assets/persona.png';

// componentes
import MenuCarro from '../MenuCarro/MenuCarro';
import MenuUser from '../MenuUser/MenuUser';

// hooks
import { useState } from 'react';

const Nav = () => {

    const [ userDisplay, setUserDisplay ] = useState(false);
    const [ carroDisplay, setCarroDisplay ] = useState(false);

    const mostrarUser = () => {
        setUserDisplay(!userDisplay);
    }

    const mostrarCarro = () => {
        setCarroDisplay(!carroDisplay);
    }

    return (
        <nav className={styles.nav}>
            <Link to='/'> 
                <img src={logo} alt="logo" className={styles.logo} /> 
            </Link>

            <div className={styles.links}>
                <Link to='/'> HOME </Link>
                <Link to='/productos' > TODOS LOS PRODUCTOS </Link>
            </div>

            <div className={styles.menus}>
                <span>
                    <img src={iconoCarro} alt="carrito de compras" onClick={mostrarCarro}/>
                    { carroDisplay && <MenuCarro/> }
                </span>

                <span>
                    <img src={iconoUser} alt="icono de usuario" onClick={mostrarUser} />
                    { userDisplay && <MenuUser/> }
                </span>
            </div>
        </nav>
    )
}

export default Nav;
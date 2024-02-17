import styles from './Admin.module.scss';
import { useState } from 'react';
import CreateForm from '../../components/AdminComponents/CreateForm/CreateForm';

const Admin = () => {
    
    const [ view, setView ] = useState('estadisticas')

    const handleView = (option) => {
        const viewMapping = {
            estadisticas: 'estadisticas',
            productos: 'productos',
            crearProducto: 'crearProducto',
            usuarios: 'usuarios'
        };

        setView(viewMapping[option]);
    }

    return (
        <section>
            <h2> Hola, Admin </h2>

            <div className={styles.sections}>
                <span onClick={() => handleView('estadisticas')}>
                    Estadísticas
                </span>

                <span onClick={() => handleView('crearProducto')}>
                    Crear un producto
                </span>

                <span onClick={() => handleView('productos')}>
                    Todos los productos
                </span>

                <span onClick={() => handleView('usuarios')}>
                    Todos los usuarios
                </span>

                <hr />
            </div>

            {
                view === 'estadisticas' 
                    && 
                <article>
                    <h2> Estadísticas de la tienda </h2>
                </article>
            }

            {
                view === 'crearProducto'
                    &&
                <article>
                    <h2> Crear un producto </h2>
                    <CreateForm/>
                </article>
            }

            {
                view === 'productos'
                    &&
                <article>
                    <h2> Todos los productos </h2>
                </article>
            }

            {
                view === 'usuarios'
                    &&
                <article>
                    <h2> Todos los usuarios </h2>
                </article>
                
            }

        </section>
    )
}

export default Admin;
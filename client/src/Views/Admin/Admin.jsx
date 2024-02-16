import styles from './Admin.module.scss';
import { useState } from 'react';

const Admin = () => {
    const talles = [35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.4, 44, 44.5, 45, 45.5, 46];
    
    return (
        <section>
            <h2> Hola, Admin </h2>

            <div className={styles.sections}>
                <span>
                    Crear un producto
                </span>

                <span>
                    Todos los productos
                </span>

                <span>
                    Estadísticas
                </span>

                <hr />
            </div>

            <article>
                <h2> Crear un producto </h2>

                <form>
                    
                </form>

            </article>
        </section>
    )
}

export default Admin;
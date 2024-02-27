import styles from './Admin.module.scss';
import { useState } from 'react';
import CreateForm from '../../components/AdminComponents/CreateForm/CreateForm';

const Admin = () => {

    const [view, setView] = useState('estadisticas')

    const handleView = (option) => {
        setView(option);
    }

    return (
        <section className="p-4">
            {/* <h2 className="text-3xl font-bold mb-4">Hola, Admin</h2> */}

            <div className="flex flex-col space-y-4">
                <span className="cursor-pointer text-blue-500 hover:underline" onClick={() => handleView('estadisticas')}>
                    Estadísticas
                </span>

                <span className="cursor-pointer text-blue-500 hover:underline" onClick={() => handleView('crearProducto')}>
                    Crear un producto
                </span>

                <span className="cursor-pointer text-blue-500 hover:underline" onClick={() => handleView('productos')}>
                    Todos los productos
                </span>

                <span className="cursor-pointer text-blue-500 hover:underline" onClick={() => handleView('usuarios')}>
                    Todos los usuarios
                </span>

                <hr className="border-t my-4" />
            </div>

            {view === 'estadisticas' && (
                <article className="mt-4">
                    <h2 className="text-xl font-semibold">Estadísticas de la tienda</h2>
                </article>
            )}

            {view === 'crearProducto' && (
                <article className="mt-4">
                    <h2 className="text-xl font-semibold">Crear un producto</h2>
                    <CreateForm />
                </article>
            )}

            {view === 'productos' && (
                <article className="mt-4">
                    <h2 className="text-xl font-semibold">Todos los productos</h2>
                </article>
            )}

            {view === 'usuarios' && (
                <article className="mt-4">
                    <h2 className="text-xl font-semibold">Todos los usuarios</h2>
                </article>
            )}
        </section>

    )
}

export default Admin;
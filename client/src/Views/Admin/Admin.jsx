import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CreateCategoryForm from '../../components/AdminComponents/CategoryForm/CategoryForm';
import CreateForm from '../../components/AdminComponents/CreateForm/CreateForm';
import OrdenCompra from '../../components/AdminComponents/OrdenCompra/OrdenCompra';
import AllUsers from '../../components/AdminComponents/AllUsers/AllUsers';
import AllProducts from '../../components/AdminComponents/AllProducts/AllProducts';
import Estadisticas from '../../components/AdminComponents/Estadisticas/Estadisticas';
import SideBar from '../../components/SideBar/SideBar';
import { getName } from '../../redux/actions';
import styles from './Admin.module.scss';
import { FaChartBar, FaShoppingCart, FaList, FaUsers, FaBoxes,FaPlus ,FaEdit  } from "react-icons/fa";

const Admin = () => {
    const dispatch = useDispatch();
    const [searchString, setSearchString] = useState('');
    const [view, setView] = useState('estadisticas');

    const handleView = (option) => {
        setView(option);
    };

    const handleChange = (e) => {
        e.preventDefault();
        setSearchString(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getName(searchString));
    };

    return (
        <>
            <div className='bg-[#6B7280]'>
                <ul className='pl-1 flex justify-center'>
                    {[
                        { label: 'Estadísticas', view: 'estadisticas', icon: <FaChartBar /> },
                        { label: 'Producto', view: 'crearProducto', icon: <FaPlus   /> },
                        { label: 'Categoria', view: 'crearCategoria', icon: <FaBoxes /> },
                        { label: 'Productos', view: 'productos', icon: <FaList /> },
                        { label: 'Usuarios', view: 'usuarios', icon: <FaUsers /> },
                        { label: 'Compras', view: 'ordenCompra', icon: <FaShoppingCart /> },
                    ].map((item) => (
                        <li
                            key={item.view}
                            className={`bg-${view === item.view ? 'green' : 'white'} m-3 p-2 flex flex-nowrap items-center rounded-md cursor-pointer`}
                            onClick={() => handleView(item.view)}
                        >
                            
                            <span className={`text-xl pb-1 pr-2 ${view === item.view ? 'text-white' : 'text-black'}`}>
                                {item.icon}
                            </span>
                            <span className={`text-xl pb-1 ${view === item.view ? 'text-white' : 'text-black'}`}>
                                {item.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <section className="p-4">


                <div className={styles.content}>
                    {view === 'crearCategoria' && (
                        <article className="mt-4">
                            {/* <h2 className="text-xl font-semibold">Crear una categoría</h2> */}
                            <CreateCategoryForm />
                        </article>
                    )}

                    {view === 'estadisticas' && (
                        <article className="mt-4">
                            <h2 className="text-xl font-semibold">Estadísticas de la tienda</h2>
                        </article>
                    )}

                    {view === 'crearProducto' && (
                        <article className={styles.section}>
                            <h2 className={styles.heading}>Crear un producto</h2>
                            <CreateForm />
                        </article>
                    )}

                    {view === 'ordenCompra' && (
                        <article className={styles.section}>
                            <h2 className={styles.heading}>Ordenes de Compra</h2>
                            <OrdenCompra />
                        </article>
                    )}

                    {view === 'productos' && (
                        <div>
                            <article className="flex">
                                <SideBar handleChange={handleChange} handleSubmit={handleSubmit} />
                                <AllProducts />
                            </article>
                        </div>
                    )}

                    {view === 'usuarios' && (
                        <article className={styles.section}>
                            <h2 className={styles.heading}>Todos los usuarios</h2>
                            <AllUsers />
                        </article>
                    )}
                </div>
            </section>
        </>
    );
};

export default Admin;

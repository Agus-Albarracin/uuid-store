import styles from './MenuCarro.module.scss'

const MenuCarro = ({ mostrarCarro }) => {
    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-50" onClick={() => mostrarCarro(false)}></div>

            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-64 bg-white p-4 shadow-md">
                    <div className="font-bold text-red-600 text-xl mb-4">CARRITO</div>

                    {/* Aquí puedes agregar el contenido específico del carrito de compras */}
                    {/* Por ejemplo, podrías mapear los elementos del carrito aquí */}

                    <button
                        className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
                        onClick={() => mostrarCarro(false)}
                    >
                        Cerrar Carrito
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MenuCarro;
import styles from './MenuCarro.module.scss'

const MenuCarro = ({ mostrarCarro }) => {
    return (
        <div className={styles.menuContainer}>
            <div className={styles.fondo} onClick={() => mostrarCarro(false)}>
                FONDO
            </div>

            <div className={styles.carro}>
                CARRITO
            </div>
        </div>
    )
}

export default MenuCarro;
import styles from './MenuCarro.module.scss'

const MenuCarro = ({ setCarroDisplay }) => {
    return (
        <div className={styles.menuContainer}>
            <div className={styles.fondo} onClick={() => setCarroDisplay(false)}>
                FONDO
            </div>

            <div className={styles.carro}>
                CARRITO
            </div>
        </div>
    )
}

export default MenuCarro;
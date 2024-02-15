import styles from './MenuUser.module.scss'

import Autenticador from '../../Helpers/Auntenticador';

const MenuUser = () => {
    return (
        <div className={styles.menuContainer}>
            <Autenticador/>
        </div>
    )
}

export default MenuUser;
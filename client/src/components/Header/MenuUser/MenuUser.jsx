import styles from './MenuUser.module.scss'

import { useState } from 'react';

import LogIn from './LogInForm/LogInForm';
import SignIn from './SignInForm/SignInForm';

const MenuUser = ({ mostrarUser }) => {

    const [ logInOrSignIn, setLogInOrSignIn ] = useState(false);

    const handleView = () => {
        setLogInOrSignIn(!logInOrSignIn);
    }

    return (
        <div className={styles.viewContainer} >
            <div className={styles.fondo} onClick={mostrarUser}></div>
            
            <div className={styles.menuContainer}>
                {
                    logInOrSignIn ? (
                        <LogIn handleView={handleView} />
                    ) : (
                        <SignIn handleView={handleView} />
                    )
                }
            </div>
        </div>
    )
}

export default MenuUser;
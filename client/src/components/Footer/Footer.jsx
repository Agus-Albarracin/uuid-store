import React from 'react';
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
        <p>&copy; 2024 uuid. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
import React from 'react';
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>&copy; 2024 uuid. Todos los derechos reservados.</p>
        {/* Agrega cualquier otra información del footer aquí */}
      </div>
    </footer>
  );
}

export default Footer;
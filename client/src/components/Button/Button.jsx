// Button.jsx
// import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Button.module.css';
import Button from '../Button/Button';

function ShoeButton({ to, onClick, children }) {
    if (to) {
      return (
        <Link to={to} className={styles.button}>
          {children}
        </Link>
      );
    }
  
    return (
      <Button onClick={onClick}>
        {children}
      </Button>
    );
  }

  ShoeButton.propTypes = {
    to: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
  };

export default ShoeButton;











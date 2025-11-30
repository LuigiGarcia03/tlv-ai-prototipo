import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './Header.module.css';
import Button from '../Button/Button';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        {/* Cambiamos 'a' por 'Link' para navegación interna instantánea */}
        <Link to="/" className={styles.logo}>
          Tlv AI 🎙
        </Link>
      </div>
      
      <nav aria-label="Navegación principal" className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link to="/" className={styles.navLink}>Inicio</Link>
          </li>
          <li>
            <Link to="/about" className={styles.navLink}>Nosotros</Link>
          </li>
          {/* Estos son anclas dentro de la Home, requieren manejo especial o condicional
              Por ahora, si estás en '/about', estos links te llevarán a la home */}
          <li>
            <Link to="/#features" className={styles.navLink}>Características</Link>
          </li>
        </ul>
        
        <Link to="/demo">
          <Button variant="primary">Probar Traducción Web</Button>
        </Link>
      </nav>
    </header>
  );
};
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Button from '../Button/Button';
import logoImg from '../../assets/logo Tlv AI 1.png'; // Asegúrate de que la ruta sea correcta
import { FiMenu, FiX } from 'react-icons/fi';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.headerContainer}>
      
      {/* 1. Logo (Imagen) */}
      <Link to="/" className={styles.logoLink} onClick={closeMenu}>
        <img src={logoImg} alt="Tlv AI Logo" className={styles.logoImage} />
        {/* Opcional: Si quieres mantener el texto al lado, descomenta esto: */}
        {/* <span className={styles.logoText}>Tlv AI</span> */}
      </Link>

      {/* 2. Botón Hamburguesa (Solo visible en Móvil) */}
      <button 
        className={styles.hamburger} 
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </button>
      
      {/* 3. Navegación (Desktop + Mobile Overlay) */}
      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <ul className={styles.navList}>
          <li>
            <Link to="/" className={styles.navLink} onClick={closeMenu}>Inicio</Link>
          </li>
          <li>
            <Link to="/about" className={styles.navLink} onClick={closeMenu}>Nosotros</Link>
          </li>
          <li>
            {/* Nota: Para anchors internos en React Router a veces es mejor usar hash links directos si estás en home */}
            <a href="/#features" className={styles.navLink} onClick={closeMenu}>Características</a>
          </li>
        </ul>
        
        <div className={styles.ctaWrapper} onClick={closeMenu}>
          <Link to="/demo">
            <Button variant="primary">Probar Traducción Web</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};
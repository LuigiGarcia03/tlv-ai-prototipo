import React from 'react';
import styles from './Header.module.css';
import Button from '../Button/Button'; // <-- 1. IMPORTAR

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const navItems = [
    { label: 'Características', href: '#features' },
    { label: 'App Desktop', href: '#desktop-app' },
    { label: 'Contacto', href: '#contact' },
  ];

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <a href="/" className={styles.logo}>
          Tlv AI 🎙
        </a>
      </div>
      
      <nav aria-label="Navegación principal" className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        
        {/* 2. REEMPLAZAR EL 'a' POR NUESTRO COMPONENTE */}
        <Button variant="primary" href="#download">
          Probar Traducción
        </Button>
      </nav>
    </header>
  );
};
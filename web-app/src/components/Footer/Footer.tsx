import React from 'react';
import styles from './Footer.module.css';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        
        {/* --- Copyright a la Izquierda --- */}
        <div className={styles.copyright}>
          © {currentYear} Tlv AI 🎙. Todos los derechos reservados.
        </div>
        
        {/* --- Links y Redes a la Derecha --- */}
        <div className={styles.links}>
          <a href="#privacy" className={styles.navLink}>Privacy Policy</a>
          <a href="#terms" className={styles.navLink}>Terms of Service</a>
          
          <div className={styles.socialIcons}>
            <a href="https://github.com/luigigarcia03/tlv-ai-prototipo" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <FiGithub />
            </a>
            <a href="#twitter-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </a>
            <a href="#linkedin-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FiLinkedin />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
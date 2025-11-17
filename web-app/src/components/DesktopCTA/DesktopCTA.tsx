import React from 'react';
import styles from './DesktopCTA.module.css';
import Button from '../Button/Button';
import { FiDownload, FiGithub } from 'react-icons/fi'; // Iconos relevantes

export const DesktopCTA: React.FC = () => {
  return (
    <section id="desktop-app" className={styles.ctaSection}>
      <div className={styles.contentWrapper}>
        
        {/* --- Columna 1: Texto y Botones --- */}
        <div className={styles.textWrapper}>
          <h2 className={styles.title}>
            Toda la potencia de Tlv AI,
            <br />
            <span className={styles.highlight}>directo en tu escritorio.</span>
          </h2>
          <p className={styles.subtitle}>
            Obtén traducciones de texto instantáneas y precisas con nuestra 
            aplicación nativa. Diseñada para un flujo de trabajo 
            rápido y sin distracciones.
          </p>
          <div className={styles.buttonGroup}>
            <Button variant="primary" href="#download-link-simulado">
              <FiDownload style={{ marginRight: '8px' }} />
              Descargar Demo
            </Button>
            <Button variant="secondary" href="https://github.com/LuigiGarcia03/tlv-ai-prototipo.git" target="_blank" rel="noopener noreferrer">
              <FiGithub style={{ marginRight: '8px' }} />
              Ver Repositorio
            </Button>
          </div>
        </div>
        
        {/* --- Columna 2: Mockup (Placeholder) --- */}
        <div className={styles.mockupWrapper}>
          <div className={styles.mockupPlaceholder}>
            <div className={styles.mockupHeader}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
            <div className={styles.mockupBody}>
              <p>Wireframe de la App Desktop</p>
              <p>[Tlv AI Desktop App]</p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};
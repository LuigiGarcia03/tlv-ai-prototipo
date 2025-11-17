import React from 'react';
import styles from './Hero.module.css';
import Button from '../Button/Button'; // Importamos nuestro botón

interface HeroProps {}

export const Hero: React.FC<HeroProps> = () => {
  return (
    // <section> es la etiqueta semántica correcta
    <section className={styles.heroContainer}>
      <div className={styles.contentWrapper}>
        
        {/* H1 es vital para el SEO y la jerarquía */}
        <h1 className={styles.title}>
          Traducción Profesional Potenciada por IA
        </h1>
        
        <p className={styles.subtitle}>
          Comunícate sin barreras con Tlv AI. Precisión y naturalidad 
          para tus documentos y proyectos, al instante.
        </p>
        
        {/* Principio de Proximidad: 
            Los botones están juntos y relacionados con el texto */}
        <div className={styles.buttonGroup}>
          <Button variant="primary" href="#translate-web">
            Comenzar a Traducir
          </Button>
          <Button variant="secondary" href="#desktop-app">
            Conocer la App Desktop
          </Button>
        </div>

      </div>
      
      {/* (Optimización Futura): 
          Aquí iría la ilustración o mockup 
      <div className={styles.imageWrapper}>
        [Imagen del producto]
      </div> 
      */}
      
    </section>
  );
};
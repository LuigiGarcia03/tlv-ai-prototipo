import React from 'react';
import styles from './About.module.css';
import { FiTarget, FiEye, FiAward, FiTrendingUp, FiShield, FiUsers } from 'react-icons/fi';

export const About: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* 1. Header de Sección */}
        <div className={styles.header}>
          <h2 className={styles.title}>Acerca de Nosotros</h2>
          <p className={styles.subtitle}>
            Transformando la comunicación global a través de la inteligencia artificial.
            Innovación, adaptabilidad y simplicidad.
          </p>
        </div>

        {/* 2. Misión y Visión (Extraído de fuente 109, 110) */}
        <div className={styles.mvGrid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <FiTarget /> Misión
            </h3>
            <p className={styles.cardText}>
              Brindar un servicio de traducción con IA de la mejor calidad, 
              con innovación y mejora continua, haciendo que la comprensión 
              de contenido en otros idiomas sea inmediata y natural.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <FiEye /> Visión
            </h3>
            <p className={styles.cardText}>
              Ser la herramienta de apoyo esencial tanto para Usuarios como 
              Creadores de Contenido, facilitando la comprensión y difusión 
              universal a través de la potencia de la Inteligencia Artificial.
            </p>
          </div>
        </div>

        {/* 3. Valores Corporativos (Extraído de fuente 113) */}
        <div className={styles.valuesSection}>
          <h2 className={styles.sectionHeader}>
            Nuestros Valores
          </h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueItem}>
              <FiAward className={styles.valueIcon} />
              <span className={styles.valueName}>Calidad</span>
            </div>
            <div className={styles.valueItem}>
              <FiTrendingUp className={styles.valueIcon} />
              <span className={styles.valueName}>Innovación</span>
            </div>
            <div className={styles.valueItem}>
              <FiUsers className={styles.valueIcon} />
              <span className={styles.valueName}>Adaptabilidad</span>
            </div>
            <div className={styles.valueItem}>
              <FiShield className={styles.valueIcon} />
              <span className={styles.valueName}>Simplicidad</span>
            </div>
          </div>
        </div>

        {/* 4. Análisis FODA (Extraído de fuente 165) */}
        <div className={styles.valuesSection}>
          <h2 className={styles.sectionHeader}>
            Análisis Estratégico (FODA)
          </h2>
          <div className={styles.fodaGrid}>
            <div className={`${styles.fodaItem} ${styles.strengths}`}>
              <span className={styles.fodaHeader}>Fortalezas</span>
              <p>Innovación tecnológica y distinción clara frente a aplicaciones tradicionales.</p>
            </div>
            <div className={`${styles.fodaItem} ${styles.opportunities}`}>
              <span className={styles.fodaHeader}>Oportunidades</span>
              <p>Uso de modismos locales y adaptación a todas las variaciones lingüísticas.</p>
            </div>
            <div className={`${styles.fodaItem} ${styles.weaknesses}`}>
              <span className={styles.fodaHeader}>Debilidades</span>
              <p>Dependencia de la disponibilidad de la API y posibles fallas en sistemas externos.</p>
            </div>
            <div className={`${styles.fodaItem} ${styles.threats}`}>
              <span className={styles.fodaHeader}>Amenazas</span>
              <p>Rápida evolución de competidores en el sector de IA generativa.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
import React from 'react';
import styles from './Features.module.css';
import { FeatureCard } from '../FeatureCard/FeatureCard';

// Importamos los iconos que usaremos (de Feather Icons)
// ¡La "F" mayúscula es importante! (Fe)
import { FiZap, FiTarget, FiFileText } from 'react-icons/fi';

// Definimos los datos de las características "user-first"
const featuresData = [
  {
    icon: <FiTarget />,
    title: 'Precisión Profesional',
    description: 'Traducciones que capturan el matiz y el contexto, no solo palabras. Ideal para documentos técnicos y corporativos.',
  },
  {
    icon: <FiZap />,
    title: 'Velocidad Instantánea',
    description: 'Nuestra IA procesa y traduce grandes volúmenes de texto en segundos, optimizando tu flujo de trabajo.',
  },
  {
    icon: <FiFileText />,
    title: 'Soporte Multi-formato',
    description: 'Trabaja directamente con tus archivos. Traduce .pdf, .docx y más, directamente desde nuestra App de Escritorio.',
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className={styles.featuresSection}>
      <div className={styles.contentWrapper}>
        
        <h2 className={styles.sectionTitle}>
          Una traducción más inteligente
        </h2>
        <p className={styles.sectionSubtitle}>
          Tlv AI va más allá de la traducción literal para ofrecerte resultados profesionales.
        </p>

        {/* Aquí usamos CSS Grid para el layout de 3 columnas */}
        <div className={styles.grid}>
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};
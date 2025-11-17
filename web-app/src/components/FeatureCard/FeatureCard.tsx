import React, { type ReactNode } from 'react';
import styles from './FeatureCard.module.css';

// Usamos 'ReactNode' para el icono, 
// así podemos pasar un componente de react-icons
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
// En tu archivo: src/components/Button/Button.tsx
// (Asegúrate de importar tus estilos, ej. CSS Modules)
import React, { type ReactNode } from 'react';
import styles from './Button.module.css';

// --- PASO 1: Definir los Tipos ---

// 1. Props base que tendrán tanto enlaces como botones
type BaseButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  // aquí puedes añadir más props personalizadas (ej. leftIcon, isLoading)
};

// 2. Props para cuando el componente es un <button>
// Usamos Omit para evitar colisiones de props que ya definimos en Base
type ButtonAsButtonProps = BaseButtonProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, keyof BaseButtonProps> & {
    href?: undefined; // Explicitamente decimos que no hay href
  };

// 3. Props para cuando el componente es un <a>
type ButtonAsLinkProps = BaseButtonProps &
  Omit<React.ComponentPropsWithoutRef<'a'>, keyof BaseButtonProps> & {
    href: string; // href es REQUERIDO para que sea un enlace
  };

// 4. El tipo final es una unión:
// TypeScript entenderá que si 'href' está presente, debe usar ButtonAsLinkProps
type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

// --- PASO 2: Implementar el Componente Polimórfico ---
// En tu archivo: src/components/Button/Button.tsx
// (Los tipos de arriba - BaseButtonProps, ButtonAsButtonProps, etc. - se quedan IGUAL)

const Button: React.FC<ButtonProps> = (props) => {
  // --- PASO 1: Calcular clases (común a ambos) ---
  const { variant = 'primary' } = props;

  // (Asegúrate de que 'styles.btn' y 'styles[`btn-${variant}`]' existan en tu CSS Module)
  const classNames = [
    styles.base,
    styles[variant],
    // Puedes añadir más clases condicionales aquí, ej:
    // props.disabled ? styles.disabled : ''
  ].join(' ');

  // --- PASO 2: Renderizado Condicional Explícito (La Solución) ---
  // Esta es la clave. Si 'props' tiene 'href', TypeScript
  // sabrá que 'props' es del tipo 'ButtonAsLinkProps'.

  if ('href' in props && props.href !== undefined) {
    // TypeScript ahora sabe que 'props' es ButtonAsLinkProps
    // ... por lo tanto, 'type' (si existe) es el 'type' de <a> (string)
    
    // Extraemos 'children' y 'variant' para que no se pasen en 'rest'
    const { children, variant: _variant, ...restOfLinkProps } = props;
    
    return (
      <a
        className={classNames}
        {...restOfLinkProps} // Aquí 'restOfLinkProps' es del tipo correcto
      >
        {children}
      </a>
    );
  }

  // --- Si no tiene 'href', es un botón ---
  // TypeScript sabe que 'props' es ButtonAsButtonProps
  // ... por lo tanto, 'type' es "button" | "submit" | "reset"

  // Extraemos 'children' y 'variant', y damos un valor por defecto a 'type'
  const { children, variant: _variant, type = 'button', ...restOfButtonProps } = props;

  return (
    <button
      className={classNames}
      type={type} // Asignamos el 'type' por defecto aquí
      {...restOfButtonProps} // 'restOfButtonProps' es del tipo correcto
    >
      {children}
    </button>
  );
};

export default Button;
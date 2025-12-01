import React, { useState } from 'react';
import styles from './TranslationBox.module.css';
import Button from '../Button/Button';
import { FiArrowRight } from 'react-icons/fi'; // Icono para el botón

// Simulación de la API (1.5 segundos de retraso)
const fakeTranslateAPI = (text: string): Promise<string> => {
  console.log(`Simulando traducción para: "${text}"`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (text.trim().toLowerCase() === 'error') {
        // Para probar el estado de error, escribe "error"
        reject(new Error('Error de traducción simulado.'));
      } else {
        resolve(`[Traducción Simulada] ${text}`);
      }
    }, 1500);
  });
};

export const TranslationBox: React.FC = () => {
  // --- 1. Definición de Estados ---
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // --- 2. Manejador de Eventos ---
  const handleTranslate = async () => {
    // No hacer nada si ya está cargando o no hay texto
    if (isLoading || !inputText) return;

    // Resetear estados e iniciar carga
    setIsLoading(true);
    setError(null);
    setOutputText('');

    try {
      const translatedText = await fakeTranslateAPI(inputText);
      setOutputText(translatedText);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error desconocido.');
    } finally {
      // Importante: siempre detener la carga
      setIsLoading(false);
    }
  };

  return (
    <section id="translate-web" className={styles.translateSection}>
      <h2 className={styles.title}>Prueba Tlv AI ahora</h2>
      
      {/* --- 3. Renderizado de Errores --- */}
      {error && (
        <div className={styles.errorBox}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className={styles.boxContainer}>
        {/* --- Caja de Entrada --- */}
        <div className={styles.inputWrapper}>
          <div className={styles.header}>
            <span>Detectar Idioma (Auto)</span>
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Escribe el texto a traducir..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* --- Caja de Salida --- */}
        <div className={styles.outputWrapper}>
          <div className={styles.header}>
            <span>Español (Simulado)</span>
          </div>
          <textarea
            className={styles.textarea}
            placeholder={isLoading ? 'Traduciendo...' : 'Traducción...'}
            value={outputText}
            readOnly // Clave para UX
            disabled={isLoading}
          />
        </div>
      </div>
      
      {/* --- 4. Botón de Acción con Estado --- */}
      <div className={styles.buttonContainer}>
        <Button
          variant="primary"
          onClick={handleTranslate}
          disabled={isLoading || !inputText}
        >
          {isLoading ? 'Traduciendo...' : 'Traducir'}
          {!isLoading && <FiArrowRight style={{ marginLeft: '8px' }} />}
        </Button>
      </div>
    </section>
  );
};
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Button from '../components/Button/Button';
import { FiArrowRight, FiCopy, FiCpu, FiAlertTriangle } from 'react-icons/fi';
import styles from '../components/TranslationBox/TranslationBox.module.css';

// --- CONFIGURACIÓN DE LA API ---
// 1. Intenta leer del archivo .env
// 2. Si falla, usa la cadena vacía (o pega tu key aquí entre comillas si es una emergencia)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ""; 

export const TranslatorPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sourceLang, setSourceLang] = useState('Inglés');
  const [targetLang, setTargetLang] = useState('Español');

  const handleTranslate = async () => {
    // Validación básica
    if (!inputText.trim()) {
      setError("Por favor escribe algo para traducir.");
      return;
    }
    
    // Validación de API Key
    if (!API_KEY) {
      setError("Falta la API Key. Revisa el archivo .env o la configuración.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Inicializar el SDK de Google
      const genAI = new GoogleGenerativeAI(API_KEY);
      
      // Usamos el modelo 'gemini-1.5-flash' que es rápido y gratuito
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
        Actúa como un traductor profesional de la herramienta Tlv AI.
        Traduce el siguiente texto del idioma ${sourceLang} al idioma ${targetLang}.
        
        Reglas estrictas:
        1. Devuelve SOLAMENTE el texto traducido.
        2. No incluyas notas, explicaciones, ni comillas adicionales.
        3. Mantén el tono original del mensaje.

        Texto a traducir:
        "${inputText}"
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setOutputText(text);
    } catch (err: any) {
      console.error("Error detallado:", err);
      // Mensaje de error amigable para el usuario
      let errorMsg = "Error de conexión con Gemini.";
      
      if (err.message.includes("API key not valid")) {
        errorMsg = "La API Key no es válida. Verifica tu configuración.";
      } else if (err.message.includes("403")) {
        errorMsg = "Acceso denegado (403). Verifica permisos de la API.";
      } else if (err.message.includes("fetch")) {
        errorMsg = "Error de red. Verifica tu conexión a internet.";
      }
      
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // ... (El resto del return se mantiene igual que en tu código anterior)
  return (
    <div style={{ padding: '80px 20px', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Encabezado */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-header)', color: '#2D3748', fontSize: '3rem', fontWeight: 700 }}>
          Tlv AI <span style={{ color: '#2A9D8F' }}>Web Demo</span>
        </h1>
        <p style={{ color: '#718096', fontFamily: 'var(--font-body)' }}>
          Prototipo funcional conectado a Google Gemini API
        </p>
      </div>

      {/* Controles de Idioma */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', justifyContent: 'center', alignItems: 'center' }}>
        <select 
          value={sourceLang} 
          onChange={(e) => setSourceLang(e.target.value)}
          style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E0', fontFamily: 'var(--font-body)', fontSize: '1rem' }}
        >
          <option>Inglés</option>
          <option>Español</option>
          <option>Francés</option>
          <option>Alemán</option>
          <option>Japonés</option>
        </select>
        
        <FiArrowRight size={24} color="#CBD5E0" />
        
        <select 
          value={targetLang} 
          onChange={(e) => setTargetLang(e.target.value)}
          style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E0', fontFamily: 'var(--font-body)', fontSize: '1rem' }}
        >
          <option>Español</option>
          <option>Inglés</option>
          <option>Francés</option>
          <option>Alemán</option>
          <option>Japonés</option>
        </select>
      </div>

      {/* Área de Traducción */}
      <div className={styles.boxContainer}>
        <div className={styles.inputWrapper}>
          <div className={styles.header}>Entrada</div>
          <textarea
            className={styles.textarea}
            placeholder="Escribe el texto aquí..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <div className={styles.outputWrapper}>
          <div className={styles.header}>Salida</div>
          <textarea
            className={styles.textarea}
            value={isLoading ? 'Generando traducción...' : outputText}
            readOnly
            style={{ color: isLoading ? '#2A9D8F' : '#2D3748' }}
          />
          {outputText && !isLoading && (
            <button 
              onClick={() => navigator.clipboard.writeText(outputText)}
              style={{ 
                position: 'absolute', bottom: '16px', right: '16px', 
                background: 'white', border: '1px solid #CBD5E0', 
                borderRadius: '6px', padding: '8px', cursor: 'pointer', color: '#718096',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
              title="Copiar texto"
            >
              <FiCopy size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Mensajes de Error */}
      {error && (
        <div style={{ 
          marginTop: '24px', padding: '16px', 
          backgroundColor: '#FFF5F5', color: '#C53030', border: '1px solid #FC8181',
          borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px',
          maxWidth: '800px', margin: '24px auto 0 auto'
        }}>
          <FiAlertTriangle size={20} /> 
          <span style={{ fontFamily: 'var(--font-body)' }}>{error}</span>
        </div>
      )}

      {/* Botón de Acción */}
      <div className={styles.buttonContainer}>
        <Button variant="primary" onClick={handleTranslate} disabled={isLoading || !inputText}>
          {isLoading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCpu className="spin" /> Procesando...
            </span>
          ) : (
            'TRADUCIR AHORA'
          )}
        </Button>
      </div>

    </div>
  );
};
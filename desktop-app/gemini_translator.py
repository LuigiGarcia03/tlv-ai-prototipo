import os
import google.generativeai as genai # type: ignore
from dotenv import load_dotenv

# 1. Cargar la API Key de forma segura
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# 2. Configurar el SDK de Google
# (Añadimos 'safety_settings' para ser menos restrictivos en un prototipo)
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel(
    'gemini-2.5-flash',
    safety_settings={
        'HARM_CATEGORY_HARASSMENT': 'BLOCK_NONE',
        'HARM_CATEGORY_HATE_SPEECH': 'BLOCK_NONE',
        'HARM_CATEGORY_SEXUALLY_EXPLICIT': 'BLOCK_NONE',
        'HARM_CATEGORY_DANGEROUS_CONTENT': 'BLOCK_NONE',
    }
)

def translate_text(text: str, source_language: str, target_language: str) -> str:
    """
    Traduce un texto usando la API de Gemini.
    
    Args:
        text (str): El texto a traducir.
        source_language (str): El idioma de origen (ej. "Inglés").
        target_language (str): El idioma de destino (ej. "Español").

    Returns:
        str: El texto traducido.
    """
    
    # 3. Ingeniería de Prompt (Crucial para un "diseño bulletproof")
    # Le damos a la IA instrucciones muy claras para que no añada
    # texto extra ("Claro, aquí tienes tu traducción: ...")
    prompt = f"""
    Eres un traductor experto. Traduce el siguiente texto de {source_language} a {target_language}.

    Instrucciones estrictas:
    1. Responde ÚNICAMENTE con el texto traducido.
    2. No incluyas explicaciones, saludos o texto adicional.
    3. Mantén el formato y los saltos de línea si es posible.

    Texto a traducir:
    "{text}"
    """
    
    try:
        # 4. Llamar a la API
        response = model.generate_content(prompt)
        
        # 5. Devolver la respuesta limpia
        return response.text.strip()
    
    except Exception as e:
        print(f"Error durante la traducción: {e}")
        # En la UI, esto será un tk.messagebox.showerror()
        # Cumpliendo con RNF-002
        return f"Error: No se pudo traducir. Detalles: {e}"

# --- 5. Bloque de Prueba (Nuestro HITO) ---
if __name__ == "__main__":
    """
    Este bloque solo se ejecuta cuando corres este archivo directamente
    (ej: python gemini_translator.py)
    """
    print("Iniciando prueba de traducción...")
    
    # --- Prueba 1 ---
    test_text_1 = "Hello, world! This is Tlv AI."
    print(f"\nOriginal (Inglés): {test_text_1}")
    
    translation_1 = translate_text(test_text_1, "Inglés", "Español")
    print(f"Traducción (Español): {translation_1}")

    # --- Prueba 2 ---
    test_text_2 = "La ingeniaría de prompts es fundamental."
    print(f"\nOriginal (Español): {test_text_2}")
    
    translation_2 = translate_text(test_text_2, "Español", "Inglés")
    print(f"Traducción (Inglés): {translation_2}")

    print("\n¡Prueba de traducción completada!")
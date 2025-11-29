import tkinter as tk
from tkinter import ttk, font, messagebox
import os
import threading # <-- 1. Importar threading
from dotenv import load_dotenv

# 2. IMPORTAR NUESTRO CEREBRO (Ahora sí lo usamos)
from gemini_translator import translate_text

# --- CONSTANTES DE DISEÑO (Sin cambios) ---
COLOR_FONDO = "#F5F2EA"          #
COLOR_PRIMARIO = "#2A9D8F"       #
COLOR_PRIMARIO_OSCURO = "#238276" #
COLOR_TEXTO = "#2D3748"           #
COLOR_BORDE = "#CBD5E0"          #
COLOR_ERROR = "#F56565"         #
FONT_PRINCIPAL = "Inter"        #
FONT_SECUNDARIA = "Poppins"     #


# --- 3. Lógica de Traducción (La conexión) ---

def handle_translate_click(
    input_widget: tk.Text, 
    output_widget: tk.Text,
    btn_widget: ttk.Button,
    src_lang_widget: ttk.Combobox,
    tgt_lang_widget: ttk.Combobox
):
    """
    Función 'wrapper' que se llama al presionar el botón.
    Inicia el trabajo de traducción en un hilo separado.
    """
    # 1. Obtener datos de la UI
    input_text = input_widget.get("1.0", "end-1c") # "1.0" = línea 1, char 0. "end-1c" = fin menos 1 char (evita newline)
    src_lang = src_lang_widget.get()
    tgt_lang = tgt_lang_widget.get()

    # Validación simple (UX)
    if not input_text.strip():
        messagebox.showwarning("Entrada Vacía", "Por favor, escribe el texto que deseas traducir.")
        return

    # 2. Actualizar UI al estado "Cargando" (Feedback Inmediato)
    btn_widget.config(state="disabled", text="Traduciendo...")
    output_widget.config(state="normal") # Habilitar para escribir
    output_widget.delete("1.0", "end")
    output_widget.insert("1.0", "Traduciendo, por favor espera...")
    
    # 3. Iniciar el hilo "bulletproof"
    # 'daemon=True' asegura que el hilo se cierre si la app principal se cierra
    threading.Thread(
        target=translate_task, 
        args=(input_text, src_lang, tgt_lang, output_widget, btn_widget),
        daemon=True
    ).start()


def translate_task(
    text: str, 
    src: str, 
    tgt: str, 
    output_widget: tk.Text, 
    btn_widget: ttk.Button
):
    """
    Esta función se ejecuta en el hilo secundario.
    Aquí es donde llamamos a la API (la parte lenta).
    """
    try:
        # 4. Llamar al "cerebro"
        translation = translate_text(text, src, tgt)
        
        # 5. Actualizar la UI (de forma segura)
        # Tkinter no es 100% "thread-safe", pero para una sola
        # inserción de texto, esto es generalmente aceptable.
        # Una solución más robusta usaría una 'queue'.
        output_widget.delete("1.0", "end")
        output_widget.insert("1.0", translation)

    except Exception as e:
        # 6. Manejo de Errores (RNF-002)
        output_widget.delete("1.0", "end")
        output_widget.insert("1.0", f"Error: {e}", "error_tag")
        messagebox.showerror("Error de Traducción", f"Ocurrió un error al contactar la API: {e}")
    
    finally:
        # 7. Restaurar la UI (Siempre se ejecuta)
        btn_widget.config(state="normal", text="Traducir ➔")
        output_widget.config(state="disabled") # Volver a solo lectura

def main():
    """Punto de entrada principal de la aplicación Tlv AI Desktop."""
    load_dotenv()
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        messagebox.showerror("Error de API", "No se encontró la GEMINI_API_KEY en el archivo .env")
        return

    # --- 1. Configuración de la Ventana Principal (Sin cambios) ---
    root = tk.Tk()
    root.title("Tlv AI Desktop App")
    root.geometry("850x650")
    root.configure(bg=COLOR_FONDO)
    root.resizable(False, False)

    # --- 2. Definición de Fuentes (Sin cambios) ---
    font_bold_16 = (FONT_PRINCIPAL, 16, "bold")
    font_normal_12 = (FONT_PRINCIPAL, 12)
    font_normal_10 = (FONT_PRINCIPAL, 10)

    # --- 3. Configuración de Estilos TTK (Sin cambios) ---
    style = ttk.Style(root)
    style.theme_use('clam')

    style.configure("TNotebook", background=COLOR_FONDO, borderwidth=0)
    style.configure("TNotebook.Tab",
        background=COLOR_FONDO,
        foreground=COLOR_TEXTO,
        font=font_normal_12,
        padding=[10, 5],
        borderwidth=0
    )
    style.map("TNotebook.Tab",
        background=[("selected", COLOR_PRIMARIO)],
        foreground=[("selected", "white")]
    )

    style.configure("TButton",
        background=COLOR_PRIMARIO,
        foreground="white",
        font=font_bold_16,
        padding=[20, 10],
        borderwidth=0,
        focuscolor=COLOR_PRIMARIO_OSCURO
    )
    style.map("TButton",
        background=[('active', COLOR_PRIMARIO_OSCURO), ('disabled', COLOR_BORDE)] # <-- ¡Añadimos estilo 'disabled'!
    )

    style.configure("TCombobox",
        font=font_normal_12,
        padding=5,
        fieldbackground="white",
        background="white",
        bordercolor=COLOR_BORDE,
        arrowcolor=COLOR_TEXTO
    )
    style.configure("TFrame", background=COLOR_FONDO)
    
    # --- 4. Creación del Notebook (Sin cambios) ---
    notebook = ttk.Notebook(root)
    notebook.pack(pady=15, padx=20, fill="both", expand=True)

    # --- 5. PESTAÑA 1: Traducción de Texto (RF-D-002) (Ligeros cambios) ---
    text_tab = ttk.Frame(notebook, padding=20, style="TFrame")
    notebook.add(text_tab, text='  Traducción de Texto  ')

    text_tab.columnconfigure(0, weight=1)
    text_tab.columnconfigure(1, weight=0, minsize=50)
    text_tab.columnconfigure(2, weight=1)
    text_tab.rowconfigure(1, weight=1)

    # Columna Izquierda (Entrada)
    ttk.Label(text_tab, text="Texto de Origen", font=font_bold_16, background=COLOR_FONDO, foreground=COLOR_TEXTO).grid(row=0, column=0, sticky="w", pady=5)
    
    text_input = tk.Text(text_tab, font=font_normal_12, bg="white", fg=COLOR_TEXTO,
                         relief="solid", borderwidth=1, highlightbackground=COLOR_BORDE)
    text_input.grid(row=1, column=0, sticky="nsew", pady=5)
    
    combo_source_lang = ttk.Combobox(text_tab, values=["Inglés", "Español"], font=font_normal_12, state="readonly")
    combo_source_lang.set("Inglés")
    combo_source_lang.grid(row=2, column=0, sticky="w", pady=10)

    # Columna Derecha (Salida)
    ttk.Label(text_tab, text="Traducción", font=font_bold_16, background=COLOR_FONDO, foreground=COLOR_TEXTO).grid(row=0, column=2, sticky="w", pady=5)
    
    text_output = tk.Text(text_tab, font=font_normal_12, bg="white", fg=COLOR_TEXTO,
                          relief="solid", borderwidth=1, highlightbackground=COLOR_BORDE, state="disabled")
    text_output.grid(row=1, column=2, sticky="nsew", pady=5)
    
    # Añadimos un tag de estilo para el texto de error
    text_output.tag_configure("error_tag", foreground=COLOR_ERROR) #
    
    combo_target_lang = ttk.Combobox(text_tab, values=["Español", "Inglés"], font=font_normal_12, state="readonly")
    combo_target_lang.set("Español")
    combo_target_lang.grid(row=2, column=2, sticky="w", pady=10)

    # Botón Central de Traducción
    translate_button = ttk.Button(text_tab, text="Traducir ➔", style="TButton")
    
    # --- 8. ASIGNAR LA NUEVA FUNCIÓN 'wrapper' ---
    translate_button.config(command=lambda: handle_translate_click(
        text_input, text_output, translate_button, combo_source_lang, combo_target_lang
    ))
    translate_button.grid(row=3, column=0, columnspan=3, pady=20)


    # --- 6. PESTAÑAS SIMULADAS (RF-D-003) (Sin cambios) ---
    audio_tab = ttk.Frame(notebook, padding=20, style="TFrame")
    notebook.add(audio_tab, text='  Traducción de Audio  ')
    ttk.Label(audio_tab, text="Función en desarrollo.", font=font_bold_16, background=COLOR_FONDO, foreground=COLOR_TEXTO).pack(pady=50)
    ttk.Label(audio_tab, text="Próximamente en Tlv AI v2.0", font=font_normal_12, background=COLOR_FONDO, foreground=COLOR_TEXTO).pack()
    ttk.Button(audio_tab, text="Subir Archivo de Audio", state="disabled").pack(pady=20)

    video_tab = ttk.Frame(notebook, padding=20, style="TFrame")
    notebook.add(video_tab, text='  Traducción de Video  ')
    ttk.Label(video_tab, text="Próximamente en Tlv AI v2.0", font=font_normal_12, background=COLOR_FONDO, foreground=COLOR_TEXTO).pack()
    ttk.Label(video_tab, text="Próximamente en Tlv AI v2.0", font=font_normal_12, background=COLOR_FONDO, foreground=COLOR_TEXTO).pack()
    ttk.Button(video_tab, text="Subir Video", state="disabled").pack(pady=20)


    # --- 7. Iniciar el loop principal (Sin cambios) ---
    root.mainloop()

if __name__ == "__main__":
    main()
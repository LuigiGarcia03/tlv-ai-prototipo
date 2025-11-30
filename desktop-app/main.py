import tkinter as tk
from tkinter import ttk, messagebox
import os
import sys
import threading
from dotenv import load_dotenv
from PIL import Image, ImageTk

# Importamos nuestro módulo de traducción
from gemini_translator import translate_text

# --- CONSTANTES DE DISEÑO ---
COLOR_FONDO = "#F5F2EA"          # Beige corporativo
COLOR_PRIMARIO = "#2A9D8F"       # Turquesa
COLOR_PRIMARIO_OSCURO = "#238276"
COLOR_TEXTO = "#2D3748"          # Gris oscuro
COLOR_BORDE = "#CBD5E0"
COLOR_ERROR = "#F56565"
FONT_PRINCIPAL = "Inter"
FONT_BRAND = "Poppins"

# --- HELPER: Rutas ---
def resource_path(relative_path):
    try:
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")
    return os.path.join(base_path, relative_path)

# --- HELPER: Mover Ventana (Custom Title Bar) ---
def start_move(event):
    event.widget.winfo_toplevel().x = event.x
    event.widget.winfo_toplevel().y = event.y

def do_move(event):
    x = event.widget.winfo_x() + (event.x - event.widget.winfo_toplevel().x)
    y = event.widget.winfo_y() + (event.y - event.widget.winfo_toplevel().y)
    event.widget.winfo_toplevel().geometry(f"+{x}+{y}")

# --- LÓGICA DE TRADUCCIÓN ---
def handle_translate_click(input_widget, output_widget, btn_widget, src_lang_widget, tgt_lang_widget):
    input_text = input_widget.get("1.0", "end-1c")
    src_lang = src_lang_widget.get()
    tgt_lang = tgt_lang_widget.get()

    if not input_text.strip():
        messagebox.showwarning("Entrada Vacía", "Por favor, escribe el texto a traducir.")
        return

    btn_widget.config(state="disabled", text="Traduciendo...")
    output_widget.config(state="normal")
    output_widget.delete("1.0", "end")
    output_widget.insert("1.0", "Conectando con Tlv AI...")
    
    threading.Thread(
        target=translate_task, 
        args=(input_text, src_lang, tgt_lang, output_widget, btn_widget),
        daemon=True
    ).start()

def translate_task(text, src, tgt, output_widget, btn_widget):
    try:
        translation = translate_text(text, src, tgt)
        output_widget.delete("1.0", "end")
        output_widget.insert("1.0", translation)
    except Exception as e:
        output_widget.delete("1.0", "end")
        output_widget.insert("1.0", f"Error: {e}", "error_tag")
    finally:
        btn_widget.config(state="normal", text="TRADUCIR AHORA")
        output_widget.config(state="disabled")

# --- UI PRINCIPAL ---
def main():
    load_dotenv()
    # Validación simple de API (Opcional, para no bloquear la demo visual)
    # if not os.getenv("GEMINI_API_KEY"): messagebox.showwarning(...)

    root = tk.Tk()
    root.title("Tlv AI")
    root.geometry("950x650")
    root.configure(bg=COLOR_FONDO)
    
    # 1. ELIMINAR BARRA NATIVA DE WINDOWS
    root.overrideredirect(True) 

    # --- 2. BARRA DE TÍTULO PERSONALIZADA (Browser Style) ---
    title_bar = tk.Frame(root, bg=COLOR_FONDO, relief="flat", bd=0)
    title_bar.pack(fill="x", side="top", ipady=5)

    # Permitir arrastrar la ventana desde la barra
    title_bar.bind("<ButtonPress-1>", start_move)
    title_bar.bind("<B1-Motion>", do_move)

    # Lado Izquierdo: Logo + Título
    brand_frame = tk.Frame(title_bar, bg=COLOR_FONDO)
    brand_frame.pack(side="left", padx=10)
    # Importante: Bindear movimiento también al frame interno y etiquetas para que sea fácil arrastrar
    brand_frame.bind("<ButtonPress-1>", start_move)
    brand_frame.bind("<B1-Motion>", do_move)

    try:
        logo_path = resource_path(os.path.join("assets", "logo-Tlv-AI-1.ico"))
        pil_image = Image.open(logo_path).resize((24, 24), Image.LANCZOS)
        logo_photo = ImageTk.PhotoImage(pil_image)
        
        lbl_logo = tk.Label(brand_frame, image=logo_photo, bg=COLOR_FONDO)
        lbl_logo.image = logo_photo
        lbl_logo.pack(side="left", padx=(0, 10))
        lbl_logo.bind("<ButtonPress-1>", start_move)
        lbl_logo.bind("<B1-Motion>", do_move)
    except:
        pass

    lbl_title = tk.Label(brand_frame, text="Tlv AI Desktop", font=(FONT_BRAND, 12, "bold"), bg=COLOR_FONDO, fg=COLOR_TEXTO)
    lbl_title.pack(side="left")
    lbl_title.bind("<ButtonPress-1>", start_move)
    lbl_title.bind("<B1-Motion>", do_move)

    # Lado Derecho: Botón Cerrar Personalizado
    # Función para cerrar con estilo
    def close_app():
        root.destroy()
        sys.exit()

    # Botón 'X' con efecto hover rojo
    btn_close = tk.Button(title_bar, text="✕", font=("Arial", 12), bg=COLOR_FONDO, fg=COLOR_TEXTO, bd=0, command=close_app, activebackground="#E81123", activeforeground="white")
    btn_close.pack(side="right", padx=10, fill="y")
    
    # Efecto Hover para el botón cerrar
    def on_enter(e): btn_close.config(bg="#E81123", fg="white")
    def on_leave(e): btn_close.config(bg=COLOR_FONDO, fg=COLOR_TEXTO)
    btn_close.bind("<Enter>", on_enter)
    btn_close.bind("<Leave>", on_leave)

    # --- 3. CONTENIDO PRINCIPAL (Limpio, sin duplicados) ---
    main_content = tk.Frame(root, bg=COLOR_FONDO)
    main_content.pack(fill="both", expand=True, padx=20, pady=10)

    # Estilos
    style = ttk.Style()
    style.theme_use('clam')
    style.configure("TNotebook", background=COLOR_FONDO, borderwidth=0)
    style.configure("TNotebook.Tab", background=COLOR_FONDO, foreground=COLOR_TEXTO, padding=[15, 8], font=(FONT_PRINCIPAL, 10))
    style.map("TNotebook.Tab", background=[("selected", COLOR_PRIMARIO)], foreground=[("selected", "white")])
    style.configure("TButton", background=COLOR_PRIMARIO, foreground="white", font=(FONT_PRINCIPAL, 11, "bold"), borderwidth=0)
    style.map("TButton", background=[('active', COLOR_PRIMARIO_OSCURO), ('disabled', COLOR_BORDE)])
    style.configure("TFrame", background=COLOR_FONDO)

    # Notebook
    notebook = ttk.Notebook(main_content)
    notebook.pack(fill="both", expand=True)

    # -- Pestaña Texto --
    text_tab = ttk.Frame(notebook, style="TFrame")
    notebook.add(text_tab, text='   Traducción de Texto   ')

    content_frame = tk.Frame(text_tab, bg=COLOR_FONDO, padx=20, pady=20)
    content_frame.pack(fill="both", expand=True)
    content_frame.columnconfigure(0, weight=1)
    content_frame.columnconfigure(1, weight=0, minsize=50)
    content_frame.columnconfigure(2, weight=1)
    content_frame.rowconfigure(1, weight=1)

    # Inputs/Outputs
    tk.Label(content_frame, text="Texto Original", bg=COLOR_FONDO, font=(FONT_PRINCIPAL, 11, "bold")).grid(row=0, column=0, sticky="w")
    combo_src = ttk.Combobox(content_frame, values=["Inglés", "Español", "Francés"], state="readonly", width=15); combo_src.set("Inglés")
    combo_src.grid(row=0, column=0, sticky="e")
    
    input_text = tk.Text(content_frame, font=(FONT_PRINCIPAL, 12), relief="flat", highlightthickness=1, highlightbackground=COLOR_BORDE, padx=10, pady=10)
    input_text.grid(row=1, column=0, sticky="nsew", pady=10)

    tk.Label(content_frame, text="➔", bg=COLOR_FONDO, fg=COLOR_BORDE, font=("Arial", 24)).grid(row=1, column=1)

    tk.Label(content_frame, text="Traducción", bg=COLOR_FONDO, font=(FONT_PRINCIPAL, 11, "bold")).grid(row=0, column=2, sticky="w")
    combo_tgt = ttk.Combobox(content_frame, values=["Español", "Inglés", "Francés"], state="readonly", width=15); combo_tgt.set("Español")
    combo_tgt.grid(row=0, column=2, sticky="e")

    output_text = tk.Text(content_frame, font=(FONT_PRINCIPAL, 12), relief="flat", highlightthickness=1, highlightbackground=COLOR_BORDE, bg="white", padx=10, pady=10, state="disabled")
    output_text.grid(row=1, column=2, sticky="nsew", pady=10)
    output_text.tag_configure("error_tag", foreground=COLOR_ERROR)

    btn_translate = ttk.Button(content_frame, text="TRADUCIR AHORA")
    btn_translate.config(command=lambda: handle_translate_click(input_text, output_text, btn_translate, combo_src, combo_tgt))
    btn_translate.grid(row=2, column=0, columnspan=3, pady=10, ipadx=30, ipady=5)

    # -- Pestañas Placeholder --
    def create_placeholder(title, icon):
        f = ttk.Frame(notebook, style="TFrame")
        notebook.add(f, text=f'   {title}   ')
        c = tk.Frame(f, bg=COLOR_FONDO)
        c.place(relx=0.5, rely=0.5, anchor="center")
        tk.Label(c, text=icon, font=("Segoe UI Emoji", 48), bg=COLOR_FONDO).pack()
        tk.Label(c, text="Próximamente", font=(FONT_BRAND, 16, "bold"), bg=COLOR_FONDO, fg=COLOR_TEXTO).pack()

    create_placeholder("Traducción de Audio", "🎙️")
    create_placeholder("Traducción de Video", "🎬")

    # Footer
    tk.Label(root, text=" Tlv AI Desktop v1.0 | Prototipo Académico ", bg="#E2E8F0", fg="#718096", font=(FONT_PRINCIPAL, 8), anchor="e").pack(side="bottom", fill="x")

    root.mainloop()

if __name__ == "__main__":
    main()
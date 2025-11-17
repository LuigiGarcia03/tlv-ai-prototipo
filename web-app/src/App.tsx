import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Features } from './components/Features/Features';
import { DesktopCTA } from './components/DesktopCTA/DesktopCTA'; // 1. Importar
import { Footer } from './components/Footer/Footer';             // 2. Importar

function App() {
  return (
    <div className="appContainer">
      <Header />
      <main>
        <Hero />
        <Features />
        {/* Reemplazamos TranslationBox por DesktopCTA */}
        <DesktopCTA /> 
      </main>
      <Footer /> {/* 3. Añadir al final */}
    </div>
  );
}

export default App;
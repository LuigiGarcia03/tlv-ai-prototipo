import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

// páginas
import { Home } from './pages/Home';
import { About } from './components/About/About'; 

// ... imports existentes
import { TranslatorPage } from './pages/TranslatorPage'; // Importar nueva página

function App() {
  return (
    <Router>
      <div className="appContainer">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* NUEVA RUTA PARA EL DEMO */}
            <Route path="/demo" element={<TranslatorPage />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
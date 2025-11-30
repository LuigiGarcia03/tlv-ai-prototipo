import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

// Importamos nuestras páginas
import { Home } from './pages/Home';
import { About } from './components/About/About'; // Usamos el componente que creamos antes

function App() {
  return (
    <Router>
      <div className="appContainer">
        {/* El Header aparece en TODAS las páginas */}
        <Header />
        
        <main>
          {/* Aquí el contenido cambia según la URL */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* Puedes agregar más rutas aquí en el futuro */}
          </Routes>
        </main>

        {/* El Footer también aparece en TODAS las páginas */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
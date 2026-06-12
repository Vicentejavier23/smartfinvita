import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Perfil from './pages/Perfil';
import Resultados from './pages/Resultados';
import InstrumentoDetalle from './pages/InstrumentoDetalle';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/instrumento/:id" element={<InstrumentoDetalle />} />
      </Routes>
    </BrowserRouter>
  );
}

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, BookOpen } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import InstrumentCard from '../components/instruments/InstrumentCard';
import { usePerfilStore } from '../store/usePerfilStore';
import { PERFIL_META } from '../data/scoring';
import { INSTRUMENTOS } from '../data/instrumentos';
import { formatCLP } from '../utils/formatCLP';

const PERFIL_STYLES = {
  conservador: { badge: 'bg-brand-green-50 text-brand-green-800 border-green-200', label: 'Conservador' },
  moderado:    { badge: 'bg-amber-50 text-amber-800 border-amber-200',            label: 'Moderado'    },
  agresivo:    { badge: 'bg-red-50 text-red-800 border-red-200',                  label: 'Agresivo'    },
};

const GLOSARIO = [
  { term: 'Riesgo',      def: 'Probabilidad de que una inversión pierda valor en el tiempo.' },
  { term: 'Liquidez',    def: 'Facilidad con que puedes convertir un activo en dinero sin pérdida.' },
  { term: 'Horizonte',   def: 'Período de tiempo durante el cual planeas mantener tu inversión.' },
  { term: 'Diversificar', def: 'Distribuir el capital en distintos instrumentos para reducir el riesgo.' },
];

export default function Resultados() {
  const navigate = useNavigate();
  const { resultado, edad, ingresos } = usePerfilStore();
  const barRef = useRef(null);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (!resultado) return navigate('/perfil');
    // Animar barra al montar
    const t = setTimeout(() => setBarWidth(resultado.horizonte), 80);
    return () => clearTimeout(t);
  }, [resultado, navigate]);

  if (!resultado) return null;

  const meta = PERFIL_META[resultado.perfil];
  const style = PERFIL_STYLES[resultado.perfil];

  // Instrumentos del perfil actual
  const instrumentosPerfil = INSTRUMENTOS
    .filter((i) => i.perfiles.includes(resultado.perfil))
    .sort((a, b) => b.score - a.score);

  const top2Ids = instrumentosPerfil.slice(0, 2).map((i) => i.id);

  // Instrumentos de exploración (otro perfil)
  const otrosPerfil = resultado.perfil === 'agresivo' ? 'moderado' : 'agresivo';
  const explorar = INSTRUMENTOS
    .filter((i) => i.perfiles.includes(otrosPerfil) && !i.perfiles.includes(resultado.perfil))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar leftAction={{ label: 'Recalcular', onClick: () => navigate('/perfil') }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Header de resultados */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`inline-flex items-center border text-sm font-medium px-3 py-1.5 rounded-full ${style.badge}`}>
              Perfil {style.label}
            </span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{edad} años</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{formatCLP(ingresos)}/mes</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{meta.descripcion}</p>
        </div>

        {/* Barra horizonte */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-medium text-gray-800 mb-4">Horizonte de inversión sugerido</h2>
          <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2" ref={barRef}>
            <div
              style={{ width: `${barWidth}%`, transition: 'width 0.8s ease-out' }}
              className="absolute top-0 left-0 h-full bg-brand-blue-500 rounded-full"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mb-3">
            <span>Corto plazo</span>
            <span>Mediano plazo</span>
            <span>Largo plazo</span>
          </div>
          <p className="text-xs text-gray-500">{meta.horizonteTexto}</p>
        </div>

        {/* Instrumentos recomendados */}
        <section className="mb-8">
          <h2 className="text-base font-medium text-gray-900 mb-4">Instrumentos recomendados para ti</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {instrumentosPerfil.map((inst) => (
              <InstrumentCard
                key={inst.id}
                instrumento={inst}
                destacado={top2Ids.includes(inst.id)}
                onClick={() => navigate(`/instrumento/${inst.id}`)}
              />
            ))}
          </div>
        </section>

        {/* Explorar más */}
        {explorar.length > 0 && (
          <section className="mb-8">
            <h2 className="text-base font-medium text-gray-900 mb-1">Explorar más opciones</h2>
            <p className="text-xs text-gray-500 mb-4">Instrumentos de otro perfil que podrías considerar en el futuro.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {explorar.map((inst) => (
                <InstrumentCard
                  key={inst.id}
                  instrumento={inst}
                  onClick={() => navigate(`/instrumento/${inst.id}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Glosario */}
        <section className="mb-8">
          <h2 className="text-base font-medium text-gray-900 mb-4">Glosario rápido</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GLOSARIO.map((g) => (
              <div key={g.term} className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs font-medium text-brand-blue-700 mb-1">{g.term}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{g.def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-brand-blue-50 border border-brand-blue-100 rounded-xl p-5 text-center">
          <BookOpen size={20} className="text-brand-blue-600 mx-auto mb-2" aria-hidden="true" />
          <p className="text-sm font-medium text-brand-blue-800 mb-1">¿Quieres aprender más?</p>
          <p className="text-xs text-brand-blue-600 mb-3">Explora cada instrumento en detalle y entiende su regulación en Chile.</p>
          <button
            onClick={() => navigate('/')}
            className="text-xs font-medium text-brand-blue-700 underline underline-offset-2"
          >
            Ver todos los instrumentos →
          </button>
        </div>

        {/* Disclaimer */}
        <div className="flex gap-2 mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-amber-700 leading-relaxed">
            Estas recomendaciones son exclusivamente educativas y no constituyen asesoría financiera.
            Los perfiles son orientativos. Consulta a un asesor financiero certificado antes de invertir.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

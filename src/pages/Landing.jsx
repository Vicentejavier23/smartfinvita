import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, BookOpen, Users, ChevronRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import InstrumentCard from '../components/instruments/InstrumentCard';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { INSTRUMENTOS } from '../data/instrumentos';
import { PERFIL_META } from '../data/scoring';

const makePasos = (navigate, scrollToInstrumentos) => [
  { num: 1, icon: <Users size={20} aria-hidden="true" />, titulo: 'Dinos quién eres', desc: 'Ingresa tu edad, ingresos y tolerancia al riesgo en 30 segundos.', action: () => navigate('/perfil') },
  { num: 2, icon: <BookOpen size={20} aria-hidden="true" />, titulo: 'Calculamos tu perfil', desc: 'Nuestro algoritmo educativo determina si eres conservador, moderado o agresivo.', action: () => navigate('/perfil') },
  { num: 3, icon: <ShieldCheck size={20} aria-hidden="true" />, titulo: 'Explora instrumentos', desc: 'Descubre los instrumentos que mejor se adaptan a tu perfil y horizonte.', action: scrollToInstrumentos },
  { num: 4, icon: <ArrowRight size={20} aria-hidden="true" />, titulo: 'Aprende en detalle', desc: 'Lee fichas educativas completas con ventajas, desventajas y regulación.', action: scrollToInstrumentos },
];

const PERFIL_COLOR = {
  conservador: { border: 'border-green-200', badge: 'bg-brand-green-50 text-brand-green-800' },
  moderado:    { border: 'border-amber-200',  badge: 'bg-amber-50 text-amber-800' },
  agresivo:    { border: 'border-red-200',    badge: 'bg-red-50 text-red-800' },
};

export default function Landing() {
  const navigate = useNavigate();

  const scrollToInstrumentos = () => {
    document.getElementById('instrumentos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const PASOS = makePasos(navigate, scrollToInstrumentos);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-blue-50 text-brand-blue-700 text-xs font-medium px-3 py-1.5 rounded-full border border-brand-blue-100 mb-6">
          <ShieldCheck size={13} aria-hidden="true" />
          100% educativo — sin costos ni registro
        </div>
        <h1 className="text-3xl sm:text-4xl font-medium text-gray-900 leading-tight mb-4 max-w-2xl mx-auto">
          Descubre en qué invertir según tu perfil financiero
        </h1>
        <p className="text-base text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
          Una guía interactiva para entender los instrumentos de inversión del mercado chileno, adaptada a tu edad, ingresos y tolerancia al riesgo.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={() => navigate('/perfil')} className="w-full sm:w-auto px-6 py-3">
            Descubrir mi perfil
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Button variant="secondary" onClick={scrollToInstrumentos} className="w-full sm:w-auto px-6 py-3">
            Ver los instrumentos
          </Button>
        </div>
        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-gray-400">
          <span className="flex items-center gap-1.5"><ShieldCheck size={13} aria-hidden="true" className="text-brand-green-500" /> Sin registro requerido</span>
          <span className="flex items-center gap-1.5"><BookOpen size={13} aria-hidden="true" className="text-brand-green-500" /> Solo fines educativos</span>
          <span className="flex items-center gap-1.5"><Users size={13} aria-hidden="true" className="text-brand-green-500" /> Mercado chileno</span>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-medium text-gray-900 text-center mb-10">¿Cómo funciona?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PASOS.map((paso) => (
              <button
                key={paso.num}
                onClick={paso.action}
                className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-brand-blue-400 hover:shadow-md transition-all duration-150 cursor-pointer group"
              >
                <div className="w-8 h-8 bg-brand-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mb-3 group-hover:bg-brand-blue-700 transition-colors">
                  {paso.num}
                </div>
                <div className="text-brand-blue-600 mb-2">{paso.icon}</div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">{paso.titulo}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{paso.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Instrumentos */}
      <section id="instrumentos" className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-xl font-medium text-gray-900 mb-2">Los 9 instrumentos de inversión</h2>
        <p className="text-sm text-gray-500 mb-8">Explora cada instrumento para entender su funcionamiento, riesgos y regulación en Chile.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INSTRUMENTOS.map((inst) => (
            <InstrumentCard
              key={inst.id}
              instrumento={inst}
              onClick={() => navigate(`/instrumento/${inst.id}`)}
            />
          ))}
        </div>
      </section>

      {/* Perfiles */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-medium text-gray-900 text-center mb-2">Perfiles de inversión</h2>
          <p className="text-sm text-gray-500 text-center mb-8">¿Cuál se parece más a ti?</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {Object.entries(PERFIL_META).map(([key, meta]) => {
              const colors = PERFIL_COLOR[key];
              return (
                <Card key={key} className={`border ${colors.border}`}>
                  <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${colors.badge}`}>
                    {meta.label}
                  </span>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{meta.descripcion}</p>
                  <p className="text-xs text-gray-400 mb-3">{meta.horizonteTexto}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {meta.instrumentosIds.slice(0, 3).map((id) => {
                      const inst = INSTRUMENTOS.find((i) => i.id === id);
                      return inst ? (
                        <span key={id} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {inst.nombre}
                        </span>
                      ) : null;
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-brand-blue-900 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl font-medium text-white mb-3">¿Listo para descubrir tu perfil inversor?</h2>
          <p className="text-sm text-brand-blue-100 mb-8 max-w-md mx-auto">
            Responde 3 preguntas simples y recibe una guía educativa personalizada a tu situación financiera.
          </p>
          <Button onClick={() => navigate('/perfil')} className="bg-white text-brand-blue-700 hover:bg-brand-blue-50 px-8 py-3">
            Comenzar ahora
            <ChevronRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

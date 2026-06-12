import { useParams, useNavigate } from 'react-router-dom';
import { Check, X, Shield, AlertTriangle, Clock, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import RiskMeter from '../components/ui/RiskMeter';
import LucideIcon from '../components/ui/LucideIcon';
import Button from '../components/ui/Button';
import { INSTRUMENTOS } from '../data/instrumentos';

export default function InstrumentoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const instrumento = INSTRUMENTOS.find((i) => i.id === id);

  if (!instrumento) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar leftAction={{ label: 'Volver', onClick: () => navigate(-1) }} />
        <div className="max-w-lg mx-auto px-6 py-20 text-center">
          <p className="text-3xl mb-4">404</p>
          <h1 className="text-xl font-medium text-gray-900 mb-2">Instrumento no encontrado</h1>
          <p className="text-sm text-gray-500 mb-6">El instrumento que buscas no existe o fue movido.</p>
          <Button onClick={() => navigate('/')}>Ver todos los instrumentos</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar leftAction={{ label: 'Volver', onClick: () => navigate(-1) }} />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-blue-50 rounded-xl flex items-center justify-center text-brand-blue-600 flex-shrink-0">
              <LucideIcon name={instrumento.icono} size={24} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="flex items-start flex-wrap gap-2 mb-2">
                <h1 className="text-xl font-medium text-gray-900">{instrumento.nombre}</h1>
                <RiskMeter nivel={instrumento.nivelRiesgo} />
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{instrumento.descripcionCorta}</p>
            </div>
          </div>
        </div>

        {/* Métricas rápidas */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: 'Nivel de riesgo',     value: instrumento.nivelRiesgo === 'bajo' ? 'Bajo' : instrumento.nivelRiesgo === 'medio' ? 'Medio' : 'Alto', icon: <Shield size={14} aria-hidden="true" /> },
            { label: 'Horizonte',           value: instrumento.horizonte,         icon: <Clock size={14} aria-hidden="true" /> },
            { label: 'Liquidez',            value: instrumento.liquidez,          icon: <Zap size={14} aria-hidden="true" /> },
            { label: 'Retorno estimado',    value: instrumento.retornoEstimado,   icon: <TrendingUp size={14} aria-hidden="true" /> },
          ].map((m) => (
            <div key={m.label} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-brand-blue-600 mb-2">
                {m.icon}
                <span className="text-xs font-medium text-gray-500">{m.label}</span>
              </div>
              <p className="text-xs text-gray-800 leading-snug">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Descripción larga */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-5">
          <h2 className="text-sm font-medium text-gray-800 mb-3">¿Qué es?</h2>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{instrumento.descripcionLarga}</p>
        </div>

        {/* Ventajas y desventajas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div className="bg-brand-green-50 border border-green-200 rounded-xl p-5">
            <h3 className="text-sm font-medium text-brand-green-800 mb-3">Ventajas</h3>
            <ul className="space-y-2">
              {instrumento.ventajas.map((v, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-green-800">
                  <Check size={13} className="text-brand-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h3 className="text-sm font-medium text-red-800 mb-3">Desventajas</h3>
            <ul className="space-y-2">
              {instrumento.desventajas.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-red-800">
                  <X size={13} className="text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regulación */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
          <div className="flex items-center gap-2 mb-2 text-brand-blue-700">
            <Shield size={15} aria-hidden="true" />
            <h3 className="text-sm font-medium">Regulación en Chile</h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">{instrumento.regulacion}</p>
        </div>

        {/* Advertencia especial criptomonedas */}
        {instrumento.id === 'criptomonedas' && instrumento.nivelRiesgo === 'alto' && (
          <div className="bg-red-50 border border-red-300 rounded-xl p-5 mb-5">
            <div className="flex items-start gap-2">
              <AlertTriangle size={16} className="text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-red-800 mb-1">Advertencia importante</p>
                <p className="text-xs text-red-700 leading-relaxed">
                  Las criptomonedas no están reguladas por la CMF en Chile. No existen mecanismos de protección
                  al inversionista. Podrías perder el 100% de tu inversión. Invierte únicamente lo que estás
                  dispuesto a perder por completo.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer legal */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-xs text-amber-700 leading-relaxed">
            <strong>Disclaimer:</strong> La información de esta ficha es exclusivamente educativa y no constituye asesoría financiera.
            Los retornos estimados son referenciales y no garantizan resultados futuros. Consulta a un asesor financiero certificado.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => navigate('/perfil')} className="flex-1 justify-center">
            Calcular mi perfil
            <ArrowRight size={15} aria-hidden="true" />
          </Button>
          <Button variant="secondary" onClick={() => navigate('/')} className="flex-1 justify-center">
            Ver todos los instrumentos
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

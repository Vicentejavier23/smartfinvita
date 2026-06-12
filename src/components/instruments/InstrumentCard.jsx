import { Star } from 'lucide-react';
import RiskMeter from '../ui/RiskMeter';
import LucideIcon from '../ui/LucideIcon';

export default function InstrumentCard({ instrumento, destacado = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        relative bg-white rounded-xl border p-5 cursor-pointer transition-shadow hover:shadow-md
        ${destacado ? 'border-brand-blue-500 shadow-sm' : 'border-gray-200'}
      `}
    >
      {destacado && (
        <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 bg-brand-blue-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
          <Star size={10} aria-hidden="true" />
          Recomendado
        </span>
      )}

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-brand-blue-50 rounded-lg flex items-center justify-center text-brand-blue-600">
          <LucideIcon name={instrumento.icono} size={20} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-medium text-gray-900 leading-tight">{instrumento.nombre}</h3>
            <RiskMeter nivel={instrumento.nivelRiesgo} />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">{instrumento.descripcionCorta}</p>
          {instrumento.horizonte && (
            <p className="text-xs text-gray-400 mt-2">{instrumento.horizonte}</p>
          )}
        </div>
      </div>
    </div>
  );
}

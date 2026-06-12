import { TrendingUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-2 text-brand-blue-700 font-medium mb-3">
          <TrendingUp size={18} aria-hidden="true" />
          SmartFinVita
        </div>
        <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
          <strong>Disclaimer legal:</strong> SmartFinVita es una plataforma educativa. La información aquí presentada
          no constituye asesoría financiera ni una oferta de inversión. Los retornos históricos no garantizan
          resultados futuros. Consulta a un asesor financiero certificado antes de tomar decisiones de inversión.
          No estamos regulados por la Comisión para el Mercado Financiero (CMF).
        </p>
        <p className="text-xs text-gray-400 mt-3">© {new Date().getFullYear()} SmartFinVita — Solo con fines educativos</p>
      </div>
    </footer>
  );
}

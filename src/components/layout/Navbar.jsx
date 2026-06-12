import { useNavigate } from 'react-router-dom';
import { ChevronLeft, TrendingUp } from 'lucide-react';
import Button from '../ui/Button';

export default function Navbar({ leftAction }) {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Botón izquierda o espacio vacío */}
        <div className="w-28">
          {leftAction && (
            <button
              onClick={leftAction.onClick}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              {leftAction.label}
            </button>
          )}
        </div>

        {/* Logo centrado */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-brand-blue-700 font-medium text-base"
        >
          <TrendingUp size={20} aria-hidden="true" />
          SmartFinVita
        </button>

        {/* Botón derecho */}
        <div className="w-28 flex justify-end">
          <Button onClick={() => navigate('/perfil')} className="text-xs px-3 py-1.5">
            Comenzar
          </Button>
        </div>
      </div>
    </nav>
  );
}

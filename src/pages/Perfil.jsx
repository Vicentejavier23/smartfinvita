import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import { usePerfilStore } from '../store/usePerfilStore';
import { calcularPerfil } from '../data/scoring';
import { formatCLP } from '../utils/formatCLP';

const PASOS_LABELS = ['Edad', 'Ingresos', 'Tolerancia'];

const TOLERANCIAS = [
  { value: 'bajo',  label: 'Me afecta mucho perder dinero' },
  { value: 'medio', label: 'Acepto algo de pérdida temporal' },
  { value: 'alto',  label: 'No me preocupan las pérdidas cortas' },
];

export default function Perfil() {
  const navigate = useNavigate();
  const { edad, ingresos, tolerancia, setEdad, setIngresos, setTolerancia, setResultado } = usePerfilStore();

  const handleSubmit = () => {
    const resultado = calcularPerfil({ edad, ingresos, tolerancia });
    setResultado(resultado);
    navigate('/resultados');
  };

  const isValid = tolerancia !== null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar leftAction={{ label: 'Volver', onClick: () => navigate('/') }} />

      <div className="max-w-lg mx-auto px-6 py-10">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Descubre tu perfil inversor</h1>
          <p className="text-sm text-gray-500">Responde 3 preguntas para recibir recomendaciones educativas personalizadas.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-8">
          {PASOS_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-brand-blue-600 text-white text-xs flex items-center justify-center font-medium">
                  {i + 1}
                </div>
                <span className="text-xs text-gray-600">{label}</span>
              </div>
              {i < PASOS_LABELS.length - 1 && <div className="flex-1 h-px bg-gray-200 w-6" />}
            </div>
          ))}
        </div>

        {/* Formulario */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-8">

          {/* Campo edad */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-800">Edad</label>
              <span className="text-sm font-medium text-brand-blue-600">{edad} años</span>
            </div>
            <input
              type="range"
              min={18}
              max={70}
              step={1}
              value={edad}
              onChange={(e) => setEdad(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-brand-blue-600"
              aria-label="Slider de edad"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>18 años</span>
              <span>70 años</span>
            </div>
          </div>

          {/* Campo ingresos */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-800">Ingresos mensuales</label>
              <span className="text-sm font-medium text-brand-blue-600">{formatCLP(ingresos)}</span>
            </div>
            <input
              type="range"
              min={250000}
              max={5000000}
              step={50000}
              value={ingresos}
              onChange={(e) => setIngresos(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-brand-blue-600"
              aria-label="Slider de ingresos"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatCLP(250000)}</span>
              <span>{formatCLP(5000000)}</span>
            </div>
          </div>

          {/* Campo tolerancia */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-3">Tolerancia al riesgo</label>
            <div className="space-y-2">
              {TOLERANCIAS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTolerancia(opt.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                    tolerancia === opt.value
                      ? 'border-brand-blue-500 bg-brand-blue-50 text-brand-blue-800'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Botón submit */}
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full mt-6 py-3"
        >
          Ver mis recomendaciones
        </Button>

        {/* Disclaimer */}
        <div className="flex gap-2 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-amber-700 leading-relaxed">
            Esta herramienta es exclusivamente educativa. Los resultados no constituyen asesoría financiera.
            Consulta a un profesional certificado antes de invertir.
          </p>
        </div>
      </div>
    </div>
  );
}

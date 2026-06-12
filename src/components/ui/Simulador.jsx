import { useState } from 'react';
import { Calculator } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { formatCLP } from '../../utils/formatCLP';

const PLAZOS = [
  { label: '1 mes',   meses: 1 },
  { label: '3 meses', meses: 3 },
  { label: '6 meses', meses: 6 },
  { label: '1 año',   meses: 12 },
  { label: '2 años',  meses: 24 },
  { label: '3 años',  meses: 36 },
  { label: '5 años',  meses: 60 },
];

function calcularRetorno(capital, tasaAnual, meses) {
  if (meses === 0 || capital === 0) return capital;
  const tasaMensual = Math.pow(1 + tasaAnual, 1 / 12) - 1;
  return capital * Math.pow(1 + tasaMensual, meses);
}

function generarDatosGrafico(capital, tasaMin, tasaMax, totalMeses) {
  const numPuntos = Math.min(totalMeses + 1, 7);
  const data = [];
  for (let i = 0; i < numPuntos; i++) {
    const meses = Math.round((totalMeses / (numPuntos - 1)) * i);
    const min = Math.round(calcularRetorno(capital, tasaMin, meses));
    const max = Math.round(calcularRetorno(capital, tasaMax, meses));
    let label;
    if (meses === 0) label = 'Inicio';
    else if (meses < 12) label = `${meses}m`;
    else if (meses % 12 === 0) label = `${meses / 12}a`;
    else label = `${meses}m`;
    data.push({ label, min, max });
  }
  return data;
}

function formatYAxis(value) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}k`;
  return `$${value}`;
}

export default function Simulador({ tasaMin, tasaMax }) {
  const [rawMonto, setRawMonto] = useState('');
  const [plazoIdx, setPlazoIdx] = useState(3);

  const capital = parseInt(rawMonto || '0', 10);
  const plazo = PLAZOS[plazoIdx];

  const totalMin = Math.round(calcularRetorno(capital, tasaMin, plazo.meses));
  const totalMax = Math.round(calcularRetorno(capital, tasaMax, plazo.meses));
  const gananciaMin = totalMin - capital;
  const gananciaMax = totalMax - capital;
  const chartData = capital > 0
    ? generarDatosGrafico(capital, tasaMin, tasaMax, plazo.meses)
    : [];

  const handleMontoChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '');
    if (digits.length <= 12) setRawMonto(digits);
  };

  const displayMonto = rawMonto
    ? parseInt(rawMonto, 10).toLocaleString('es-CL')
    : '';

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-5">
      <div className="flex items-center gap-2 mb-5">
        <Calculator size={16} className="text-brand-blue-600" aria-hidden="true" />
        <h2 className="text-sm font-medium text-gray-800">Simulador de inversión</h2>
        <span className="ml-auto text-xs text-gray-400">valores referenciales</span>
      </div>

      <div className="space-y-4 mb-5">
        {/* Monto */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">
            Monto a depositar (CLP)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none select-none">
              $
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={displayMonto}
              onChange={handleMontoChange}
              placeholder="500.000"
              className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue-100 focus:border-brand-blue-500 transition"
            />
          </div>
        </div>

        {/* Plazo */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">
            Plazo de inversión
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {PLAZOS.map((p, i) => (
              <button
                key={i}
                onClick={() => setPlazoIdx(i)}
                className={`py-2 text-xs rounded-lg border font-medium transition-colors ${
                  plazoIdx === i
                    ? 'bg-brand-blue-600 text-white border-brand-blue-600'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-brand-blue-300 hover:text-brand-blue-600'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {capital > 0 ? (
        <>
          {/* Resumen */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2.5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Capital inicial</span>
              <span className="font-medium text-gray-700">{formatCLP(capital)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Ganancia estimada</span>
              <span className="font-medium text-brand-green-500">
                +{formatCLP(gananciaMin)} – +{formatCLP(gananciaMax)}
              </span>
            </div>
            <div className="h-px bg-gray-200" />
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-800">Total al final del plazo</span>
              <span className="font-semibold text-gray-900">
                {formatCLP(totalMin)} – {formatCLP(totalMax)}
              </span>
            </div>
          </div>

          {/* Gráfico */}
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradMin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#378ADD" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#378ADD" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradMax" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D9E75" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#1D9E75" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={formatYAxis}
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                  width={52}
                />
                <Tooltip
                  formatter={(v, name) => [formatCLP(v), name === 'min' ? 'Escenario mínimo' : 'Escenario máximo']}
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                />
                <Area
                  type="monotone"
                  dataKey="min"
                  name="min"
                  stroke="#185FA5"
                  strokeWidth={2}
                  fill="url(#gradMin)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="max"
                  name="max"
                  stroke="#1D9E75"
                  strokeWidth={2}
                  fill="url(#gradMax)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Leyenda */}
          <div className="flex items-center gap-4 mt-2 justify-center">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-brand-blue-600 rounded-full inline-block" />
              <span className="text-xs text-gray-500">Escenario mínimo ({(tasaMin * 100).toFixed(0)}% anual)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-brand-green-500 rounded-full inline-block" />
              <span className="text-xs text-gray-500">Escenario máximo ({(tasaMax * 100).toFixed(0)}% anual)</span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-300">
          <Calculator size={32} aria-hidden="true" />
          <p className="mt-2 text-sm">Ingresa un monto para simular</p>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-4 leading-relaxed">
        Simulación con interés compuesto mensual basada en tasas históricas de referencia. No garantiza resultados futuros.
      </p>
    </div>
  );
}

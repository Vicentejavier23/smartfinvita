export function calcularPerfil({ edad, ingresos, tolerancia }) {
  let score = 0;

  if (edad < 30) score += 35;
  else if (edad < 40) score += 28;
  else if (edad < 50) score += 18;
  else if (edad < 60) score += 10;
  else score += 4;

  if (ingresos >= 3000000) score += 30;
  else if (ingresos >= 1500000) score += 22;
  else if (ingresos >= 900000) score += 14;
  else score += 6;

  const toleranciaScore = { alto: 35, medio: 18, bajo: 0 };
  score += toleranciaScore[tolerancia] ?? 0;

  if (score >= 68) return { perfil: 'agresivo', score, horizonte: 85 };
  if (score >= 40) return { perfil: 'moderado', score, horizonte: 52 };
  return { perfil: 'conservador', score, horizonte: 22 };
}

export const PERFIL_META = {
  conservador: {
    label: 'Conservador',
    color: 'green',
    descripcion: 'Priorizas la seguridad de tu capital por sobre el retorno.',
    horizonteTexto: 'Corto a mediano plazo (1–5 años)',
    instrumentosIds: ['deposito-plazo', 'apv', 'cuenta-dos-afp'],
  },
  moderado: {
    label: 'Moderado',
    color: 'amber',
    descripcion: 'Buscas equilibrio entre rentabilidad y seguridad.',
    horizonteTexto: 'Mediano plazo (3–10 años)',
    instrumentosIds: ['fondos-mutuos', 'etf', 'bienes-raices', 'fintech', 'cuenta-dos-afp'],
  },
  agresivo: {
    label: 'Agresivo',
    color: 'red',
    descripcion: 'Buscas maximizar el retorno y toleras alta volatilidad.',
    horizonteTexto: 'Largo plazo (7–20+ años)',
    instrumentosIds: ['acciones', 'etf', 'criptomonedas', 'fondos-mutuos', 'fintech'],
  },
};

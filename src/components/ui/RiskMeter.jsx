const CONFIG = {
  bajo:  { label: 'Riesgo Bajo',  bg: '#E1F5EE', text: '#085041', border: '#5DCAA5' },
  medio: { label: 'Riesgo Medio', bg: '#FAEEDA', text: '#633806', border: '#EF9F27' },
  alto:  { label: 'Riesgo Alto',  bg: '#FAECE7', text: '#4A1B0C', border: '#D85A30' },
};

export default function RiskMeter({ nivel }) {
  const cfg = CONFIG[nivel] ?? CONFIG.bajo;
  return (
    <span
      style={{ backgroundColor: cfg.bg, color: cfg.text, borderColor: cfg.border }}
      className="inline-flex items-center border text-xs font-medium px-2.5 py-1 rounded-full"
    >
      {cfg.label}
    </span>
  );
}

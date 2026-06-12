export default function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-gray-100 text-gray-700 border-gray-200',
    blue:    'bg-brand-blue-50 text-brand-blue-700 border-brand-blue-100',
    green:   'bg-brand-green-50 text-brand-green-800 border-green-200',
    amber:   'bg-amber-50 text-amber-800 border-amber-200',
    red:     'bg-red-50 text-red-800 border-red-200',
  };
  return (
    <span className={`inline-flex items-center border text-xs font-medium px-2.5 py-1 rounded-full ${variants[variant] ?? variants.default}`}>
      {children}
    </span>
  );
}

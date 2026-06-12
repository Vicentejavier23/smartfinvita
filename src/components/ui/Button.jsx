export default function Button({ children, variant = 'primary', onClick, disabled, className = '', type = 'button' }) {
  const base = 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary:   'bg-brand-blue-600 text-white hover:bg-brand-blue-700 focus:ring-brand-blue-500',
    secondary: 'bg-white text-brand-blue-600 border border-brand-blue-200 hover:bg-brand-blue-50 focus:ring-brand-blue-300',
    ghost:     'text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
    >
      {children}
    </button>
  );
}

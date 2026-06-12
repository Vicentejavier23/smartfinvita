export default function Card({ children, className = '', onClick }) {
  const clickable = onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : '';
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-gray-200 rounded-xl p-5 ${clickable} ${className}`}
    >
      {children}
    </div>
  );
}

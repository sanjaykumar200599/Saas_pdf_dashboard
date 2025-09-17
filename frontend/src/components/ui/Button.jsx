export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium bg-sky-600 text-white hover:bg-sky-700 ${className}`}
    >
      {children}
    </button>
  );
}

export default function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      value={value}
      onChange={e => onChange?.(e.target.value)}
      placeholder={placeholder}
      type={type}
      className="border rounded px-3 py-2 w-full focus:outline-sky-500"
    />
  );
}

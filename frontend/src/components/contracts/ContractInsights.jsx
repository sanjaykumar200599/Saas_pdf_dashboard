export default function ContractInsights({ insights = [] }) {
  if (!insights.length) {
    return <div className="text-slate-500 text-sm">No insights available.</div>;
  }
  return (
    <ul className="space-y-2">
      {insights.map((i, idx) => (
        <li key={idx} className="bg-white p-3 rounded shadow text-sm">
          {i}
        </li>
      ))}
    </ul>
  );
}

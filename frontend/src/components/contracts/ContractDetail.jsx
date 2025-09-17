export default function ContractDetail({ contract }) {
  if (!contract) return <div>Loading...</div>;
  return (
    <div>
      <h2 className="text-2xl font-semibold">{contract.filename}</h2>
      <div className="mt-3 grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-slate-500">Status</div>
          <div className="font-medium">{contract.status}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-slate-500">Risk</div>
          <div className="font-medium">{contract.risk_score}</div>
        </div>
      </div>
      <section className="mt-6">
        <h3 className="font-semibold">AI Insights</h3>
        <div className="mt-2 text-sm text-slate-600">(Mock insights appear here.)</div>
      </section>
    </div>
  );
}

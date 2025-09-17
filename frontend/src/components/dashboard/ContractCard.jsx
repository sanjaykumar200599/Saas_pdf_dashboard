export default function ContractCard({ contract }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-semibold">{contract.filename}</h3>
      <div className="text-sm text-slate-600 mt-2">
        Status: {contract.status}
      </div>
      <div className="text-sm text-slate-600">
        Risk: {contract.risk_score}
      </div>
    </div>
  );
}

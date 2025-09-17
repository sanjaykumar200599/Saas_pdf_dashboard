import React from "react";
export default function ContractTable({ contracts = [] }) {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Parties</th>
            <th className="text-left p-3">Expiry</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Risk</th>
          </tr>
        </thead>
        <tbody>
          {contracts.length === 0 ? (
            <tr><td colSpan="5" className="p-6 text-center">No contracts</td></tr>
          ) : contracts.map(c => (
            <tr key={c.doc_id} className="border-t">
              <td className="p-3">{c.filename}</td>
              <td className="p-3">{c.parties || "-"}</td>
              <td className="p-3">{c.expiry_date || "-"}</td>
              <td className="p-3">{c.status}</td>
              <td className="p-3">{c.risk_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import ContractTable from "../components/dashboard/ContractTable";
import api from "../services/api";

export default function DashboardPage() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/contracts").then(r => {
      setContracts(r.data);
    }).catch(()=>{}).finally(()=>setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Contracts</h1>
        {loading ? <div>Loading...</div> : <ContractTable contracts={contracts} />}
      </main>
    </div>
  );
}

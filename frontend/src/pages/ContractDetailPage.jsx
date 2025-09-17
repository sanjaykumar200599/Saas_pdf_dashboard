import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import ContractDetail from "../components/contracts/ContractDetail";
import api from "../services/api";

export default function ContractDetailPage(){
  const { id } = useParams();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    api.get(`/contracts/${id}`).then(r => setContract(r.data)).catch(()=>{});
  }, [id]);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <ContractDetail contract={contract} />
      </main>
    </div>
  );
}

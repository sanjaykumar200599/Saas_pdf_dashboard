import { useEffect, useState } from "react";
import api from "../services/api";

export default function useContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchContracts() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/contracts");
      setContracts(res.data);
    } catch (err) {
      setError("Failed to load contracts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContracts();
  }, []);

  return { contracts, loading, error, refetch: fetchContracts };
}

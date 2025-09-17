import { useState } from "react";
import api from "../services/api";

export default function useQuery() {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [error, setError] = useState(null);

  async function ask(question, top_k = 5) {
    if (!question.trim()) return;
    setLoading(true);
    setError(null);
    setAnswer(null);
    setChunks([]);
    try {
      const res = await api.post("/ask", { question, top_k });
      setAnswer(res.data.answer);
      setChunks(res.data.chunks || []);
    } catch (err) {
      setError("Query failed");
    } finally {
      setLoading(false);
    }
  }

  return { loading, answer, chunks, error, ask };
}

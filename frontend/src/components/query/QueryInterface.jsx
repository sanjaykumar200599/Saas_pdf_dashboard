import React, { useState } from "react";
import Button from "../ui/Button";
import QueryResults from "./QueryResults";
import useQuery from "../../hooks/useQuery";

export default function QueryInterface() {
  const [q, setQ] = useState("");
  const { loading, answer, chunks, error, ask } = useQuery();

  const handleAsk = () => {
    ask(q);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={q}
        onChange={(e) => setQ(e.target.value)}
        rows={4}
        className="w-full border rounded p-2"
        placeholder="Ask about your contracts..."
      />

      <Button onClick={handleAsk} disabled={loading}>
        {loading ? "Asking..." : "Ask"}
      </Button>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {answer && (
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Answer</h4>
          <p className="mt-2">{answer}</p>
        </div>
      )}

      <QueryResults chunks={chunks} />
    </div>
  );
}

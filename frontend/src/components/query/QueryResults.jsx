export default function QueryResults({ chunks = [] }) {
  if (!chunks.length) return null;
  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">Supporting Chunks</h3>
      <ul className="space-y-2">
        {chunks.map((c) => (
          <li
            key={c.chunk_id}
            className="bg-white p-3 rounded shadow text-sm"
          >
            <p>{c.text || c.text_chunk}</p>
            {c.metadata?.page && (
              <p className="text-xs text-slate-500 mt-1">
                Page {c.metadata.page}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

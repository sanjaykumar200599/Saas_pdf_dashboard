import Modal from "../ui/Modal";

export default function EvidenceDrawer({ open, onClose, evidence = [] }) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Evidence</h2>
      {evidence.length === 0 ? (
        <p className="text-sm text-slate-500">No evidence found.</p>
      ) : (
        <ul className="space-y-2">
          {evidence.map((e, idx) => (
            <li
              key={idx}
              className="bg-slate-50 p-3 rounded border text-sm text-slate-700"
            >
              {e}
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}

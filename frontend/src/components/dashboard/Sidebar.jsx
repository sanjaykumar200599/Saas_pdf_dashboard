import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <aside className="w-64 bg-white p-4 border-r">
      <div className="mb-6 font-semibold text-xl">Contract SaaS</div>
      <nav className="flex flex-col gap-2">
        <Link to="/" className="py-2 px-3 rounded hover:bg-slate-100">Contracts</Link>
        <Link to="/upload" className="py-2 px-3 rounded hover:bg-slate-100">Upload</Link>
        <Link to="/query" className="py-2 px-3 rounded hover:bg-slate-100">Query</Link>
        <a href="#" className="py-2 px-3 rounded hover:bg-slate-100">Insights</a>
        <a href="#" className="py-2 px-3 rounded hover:bg-slate-100">Reports</a>
      </nav>
    </aside>
  );
}

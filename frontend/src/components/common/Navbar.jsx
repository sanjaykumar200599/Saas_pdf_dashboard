import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

export default function Navbar() {
  const { setToken } = useAuth();

  function logout() {
    setToken(null);
  }

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg text-sky-600">
        Contract SaaS
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/upload" className="hover:text-sky-600">
          Upload
        </Link>
        <Link to="/query" className="hover:text-sky-600">
          Query
        </Link>
        <Button onClick={logout} className="bg-red-500 hover:bg-red-600">
          Logout
        </Button>
      </div>
    </nav>
  );
}

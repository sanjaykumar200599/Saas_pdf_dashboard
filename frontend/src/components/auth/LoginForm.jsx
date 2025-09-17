import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuth();
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/login", { username, password });
      setToken(res.data.access_token);
    } catch (err) {
      setError(err?.response?.data?.detail || "Login failed");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}
      <Input placeholder="Username" value={username} onChange={setUsername} />
      <Input placeholder="Password" value={password} onChange={setPassword} type="password" />
      <Button type="submit">Login</Button>
    </form>
  );
}

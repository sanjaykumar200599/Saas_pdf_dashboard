import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import api from "../../services/api";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submit = async e => {
    e.preventDefault();
    setMessage("");
    try {
      await api.post("api/auth/signup", { username, password });
      setMessage("Account created. You can now login.");
    } catch (err) {
      setMessage(err?.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {message && <div className="text-sky-700">{message}</div>}
      <Input placeholder="Username" value={username} onChange={setUsername} />
      <Input placeholder="Password" value={password} onChange={setPassword} type="password" />
      <Button type="submit">Sign up</Button>
    </form>
  );
}

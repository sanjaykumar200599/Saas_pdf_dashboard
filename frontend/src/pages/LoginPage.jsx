import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

export default function LoginPage() {
  const [showSignup, setShowSignup] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">{showSignup ? "Sign up" : "Login"}</h2>
          {showSignup ? <SignupForm /> : <LoginForm />}
          <div className="mt-4 text-sm">
            <button className="text-sky-600" onClick={() => setShowSignup(s => !s)}>
              {showSignup ? "Back to login" : "Create an account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

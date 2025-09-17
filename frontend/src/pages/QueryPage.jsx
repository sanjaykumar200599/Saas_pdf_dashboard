import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import QueryInterface from "../components/query/QueryInterface";

export default function QueryPage() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl mb-4">Ask about contracts</h1>
        <QueryInterface />
      </main>
    </div>
  );
}

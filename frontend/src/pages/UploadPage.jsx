import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import FileUpload from "../components/upload/FileUpload";

export default function UploadPage() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl mb-4">Upload Contract</h1>
        <FileUpload />
      </main>
    </div>
  );
}

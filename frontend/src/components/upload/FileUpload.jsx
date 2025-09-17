import React, { useRef, useState } from "react";
import api from "../../services/api";
import Button from "../ui/Button";

export default function FileUpload() {
  const inputRef = useRef();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  async function uploadFile(file) {
    const form = new FormData();
    form.append("file", file);
    try {
      setMessage("");
      const res = await api.post("/upload", form, {
        headers: {"Content-Type": "multipart/form-data"},
        onUploadProgress: p => {
          setProgress(Math.round((p.loaded * 100) / p.total));
        }
      });
      setMessage("Uploaded: " + res.data.document_id);
    } catch (err) {
      setMessage("Upload failed");
    } finally {
      setProgress(0);
    }
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <input ref={inputRef} type="file" className="mb-3" onChange={e => uploadFile(e.target.files[0])} />
      <div className="h-3 bg-slate-100 rounded overflow-hidden">
        <div style={{width:`${progress}%`}} className="h-full bg-sky-600"></div>
      </div>
      {message && <div className="mt-2 text-sm">{message}</div>}
    </div>
  );
}

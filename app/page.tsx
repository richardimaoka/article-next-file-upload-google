"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      setUploadStatus("Please select a file first.");
      return;
    }

    setUploadStatus("Uploading...");
    console.log("Uploading file:", selectedFile.name);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus(`File uploaded successfully: ${data.filename}`);
        console.log("File upload completed!", data);
      } else {
        const errorData = await response.json();
        setUploadStatus(`File upload failed: ${errorData.error}`);
        console.error("File upload failed:", errorData);
      }
    } catch (error) {
      setUploadStatus("An error occurred during upload.");
      console.error("Network error or unexpected issue:", error);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>File Upload</h1>
        <form onSubmit={handleFileUpload}>
          <input type="file" name="file" onChange={handleFileChange} />
          <button type="submit" disabled={!selectedFile}>Upload</button>
        </form>
        {uploadStatus && <p>{uploadStatus}</p>}
      </main>
    </div>
  );
}


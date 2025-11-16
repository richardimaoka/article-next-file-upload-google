"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Simulating file upload...");
    // Simulate an API call or file processing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUploadStatus("File upload completed!");
    console.log("File upload completed!");
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>File Upload</h1>
        <form onSubmit={handleFileUpload}>
          <input type="file" />
          <button type="submit">Upload</button>
        </form>
        {uploadStatus && <p>{uploadStatus}</p>}
      </main>
    </div>
  );
}


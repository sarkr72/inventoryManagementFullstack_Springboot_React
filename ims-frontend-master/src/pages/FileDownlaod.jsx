import React, { useState } from "react";
import axios from "axios";

const FileDownload =()=> {
  const [fileName, setFileName] = useState("");

  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/files/download/${fileName}`, {
        responseType: "arraybuffer",
      });

      const file = new Blob([response.data], { type: "application/octet-stream" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <h3>Download File from S3</h3>
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Enter file name"
      />
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
}

export default FileDownload;

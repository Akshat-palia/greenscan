import { useState } from "react";
import { analyzeImage } from "../services/api";

function ImageUpload({ setResult }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await analyzeImage(formData);
      setResult(res.data); // 🔥 send to parent
    } catch (err) {
      console.error(err);
      alert("Error calling API");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <input type="file" onChange={handleChange} />

      {preview && (
        <div>
          <img src={preview} alt="preview" width="200" />
        </div>
      )}

      <button onClick={handleUpload}>Analyze</button>
    </div>
  );
}

export default ImageUpload;
import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import Viewer3D from "./components/Viewer3D";
import Dashboard from "./components/Dashboard";
function App() {
  const [result, setResult] = useState(null);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>GreenScan 🌱</h1>

      <ImageUpload setResult={setResult} />

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>Detected: {result.object}</h2>

          {/* ✅ PASS FULL DATA */}
          <Viewer3D data={result} />
          <Dashboard result={result} />
        </div>
      )}
    </div>
  );
}

export default App;
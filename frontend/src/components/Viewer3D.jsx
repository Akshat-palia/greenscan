import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useState } from "react";

function Label({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        padding: "8px 12px",
        borderRadius: "10px",
        color: "white",
        border: "1px solid rgba(255,255,255,0.2)",
        fontSize: "12px",
        cursor: "pointer",
        minWidth: "100px",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}

function Box({ data, onVerifyClick }) {
  return (
    <mesh rotation={[0.4, 0.2, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#4ade80" />

      <Html position={[2.5, 1, 0]}>
        <Label>🌍 {data.carbon}</Label>
      </Html>

      <Html position={[-2.5, 1, 0]}>
        <Label>♻️ {data.score}</Label>
      </Html>

      <Html position={[0, 2.5, 0]}>
        <Label>🧾 {data.material}</Label>
      </Html>

      <Html position={[0, -2.5, 0]}>
        <Label onClick={onVerifyClick}>
          🔐 {data.verification.status}
        </Label>
      </Html>
    </mesh>
  );
}

export default function Viewer3D({ data }) {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      
      {/* 3D Canvas */}
      <Canvas style={{ height: "400px", background: "#111" }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 5]} />

        <Box data={data} onVerifyClick={() => setShowPanel(true)} />

        <OrbitControls />
      </Canvas>

      {/* 🔥 SIDE PANEL (GLASS UI) */}
      {showPanel && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "320px",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            color: "white",
            padding: "20px",
            borderLeft: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "-10px 0 30px rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            animation: "slideIn 0.3s ease",
          }}
        >
          <div>
            <h3 style={{ marginBottom: "15px" }}>🔗 Blockchain Record</h3>

            <p><b>Product:</b> {data.object}</p>
            <p><b>Status:</b> {data.verification.status}</p>

            <p style={{ wordBreak: "break-all" }}>
              <b>Hash:</b> {data.verification.hash}
            </p>

            <p><b>Time:</b> {data.verification.timestamp}</p>
          </div>

          <button
            onClick={() => setShowPanel(false)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: "#4ade80",
              color: "#111",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Close
          </button>
        </div>
      )}

    </div>
  );
}
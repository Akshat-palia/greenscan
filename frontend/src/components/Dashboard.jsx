import { useEffect, useState } from "react";

export default function Dashboard({ result }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (result) {
      const updated = [...history, result];
      setHistory(updated);
      localStorage.setItem("greenscan-history", JSON.stringify(updated));
    }
  }, [result]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("greenscan-history")) || [];
    setHistory(stored);
  }, []);

  // calculations
  const totalScans = history.length;

  const totalCarbon = history.reduce((sum, item) => {
    const value = parseFloat(item.carbon);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const categories = {};
  history.forEach((item) => {
    categories[item.object] = (categories[item.object] || 0) + 1;
  });

  return (
    <div
      style={{
        marginTop: "40px",
        padding: "20px",
        background: "#111",
        color: "white",
        borderRadius: "10px",
      }}
    >
      <h2>📊 Dashboard</h2>

      <p><b>Total Scans:</b> {totalScans}</p>
      <p><b>Total Carbon:</b> {totalCarbon} kg CO₂</p>

      <h3>Category Breakdown</h3>
      {Object.entries(categories).map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}

      <h3>Recent Scans</h3>
      {history.slice(-3).map((item, index) => (
        <p key={index}>
          {item.object} → {item.carbon}
        </p>
      ))}
    </div>
  );
}
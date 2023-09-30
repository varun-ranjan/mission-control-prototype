import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [speed, setSpeed] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/speed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ speed }),
    });
  }

  useEffect(() => {
    fetch("http://localhost:3000/connected", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setStatus(data));
  });

  return (
    <>
      <form onSubmit={handleSubmit} className="set-speed-form">
        <div className="form-row">
          <label htmlFor="speed">Set Speed</label>
          <input
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            type="number"
            id="speed"
          />
        </div>
        <button className="btn">Confirm</button>
      </form>
      <h2>Rover is {status ? "Connected" : "Disconnected"}</h2>
    </>
  );
}

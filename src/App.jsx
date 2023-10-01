import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [speed, setSpeed] = useState("");
  const [status, setStatus] = useState("");
  const [direction, setDirection] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/speed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ speed }),
    });
  }

  function handleKeyDown(e) {
    var key = e.key;
    var direction;
    if (key == "w") direction = "forward";
    else if (key == "a") direction = "left";
    else if (key == "s") direction = "backward";
    else if (key == "d") direction = "right";

    if (direction != undefined) {
      fetch("http://localhost:3000/direction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction }),
      });
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, true);
  }, []);

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

import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [speed, setSpeed] = useState("");
  const [direction, setDirection] = useState("");
  const [status, setStatus] = useState("");

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
    var lastKey;
    if (key != lastKey) {
      if (key == "w") setDirection("forward");
      else if (key == "a") setDirection("left");
      else if (key == "s") setDirection("backward");
      else if (key == "d") setDirection("right");

      var elements = document.querySelectorAll("div");
      for (const el of elements) {
        el.classList.remove("highlight");
      }

      var nElement = document.getElementById(key);
      nElement.classList.add("highlight");
      lastKey = key;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    fetch("http://localhost:3000/direction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

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

      <h2>Use WASD for up, left, down, and right (respectively)</h2>
      <div class="topSquare" id="w">
        W
      </div>
      <div class="botSquare" id="a">
        A
      </div>
      <div class="botSquare" id="s">
        S
      </div>
      <div class="botSquare" id="d">
        D
      </div>

      <h2>Rover is {status ? "Connected" : "Disconnected"}</h2>
    </>
  );
}

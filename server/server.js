const express = require("express");
const cors = require("cors");

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

var currSpeed;
var currDirection;
var isConnected;
var last;

app.get("/speed", (req, res) => {
  res.json(`speed is now set to ${currSpeed}`);
});

app.post("/speed", (req, res) => {
  const { speed } = req.body;
  currSpeed = speed;
  res.send("Speed set successfully");
});

app.get("/direction", (req, res) => {
  res.json(`rover is now moving ${currDirection}`);
});

app.post("/direction", (req, res) => {
  const { direction } = req.body;
  currDirection = direction;
  res.send("Direction set successfully");
});

app.get("/connected", (req, res) => {
  res.send(Date.now() - last < 1000 ? isConnected : false);
});

app.post("/connected", (req, res) => {
  last = Date.now();
  const { connected } = req.body;
  isConnected = connected;
  res.send("Status set successfully");
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));

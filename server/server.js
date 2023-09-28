const express = require("express");
const cors = require("cors");

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

var currentSpeed = 0;

app.get("/speed", (req, res) => {
  res.json(`speed is now set to ${currentSpeed}`);
});

app.post("/speed", (req, res) => {
  const { speed } = req.body;
  console.log(speed);
  currentSpeed = speed;
  res.send("Speed set successfully");
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));

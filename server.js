const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let leaderboard = [];

app.post("/submit-score", (req, res) => {
  const { name, department, score } = req.body;
  leaderboard.push({ name, department, score });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5);
  res.send("Score submitted");
});

app.get("/leaderboard", (req, res) => {
  res.json(leaderboard);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

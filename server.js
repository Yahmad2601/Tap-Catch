const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const mongoURI =
  "mongodb+srv://yahmad2601:<6QsAAL82YqZ03NGr>@tap-catch.ibp9b.mongodb.net/?retryWrites=true&w=majority&appName=Tap-Catch";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const leaderboardSchema = new mongoose.Schema({
  name: String,
  department: String,
  score: Number,
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

app.post("/submit-score", async (req, res) => {
  const { name, department, score } = req.body;
  const newScore = new Leaderboard({ name, department, score });
  await newScore.save();
  res.send("Score submitted");
});

app.get("/leaderboard", async (req, res) => {
  const scores = await Leaderboard.find().sort({ score: -1 }).limit(5);
  res.json(scores);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

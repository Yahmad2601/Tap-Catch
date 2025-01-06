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
  try {
    const { name, department, score } = req.body;
    const newScore = new Leaderboard({ name, department, score });
    await newScore.save();
    res.send("Score submitted");
  } catch (error) {
    console.error("Error submitting score:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/leaderboard", async (req, res) => {
  try {
    const scores = await Leaderboard.find().sort({ score: -1 }).limit(5);
    res.json(scores);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Enable CORS for frontend
app.use(cors());

// MongoDB connection
mongoose
  .connect("mongodb://mongo:27017/randomdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema & Model
const NumberSchema = new mongoose.Schema({
  value: Number,
});

const NumberModel = mongoose.model("Number", NumberSchema);

// Health check (optional but useful)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// API to generate random number
app.get("/random", async (req, res) => {
  try {
    const randomNumber = Math.floor(Math.random() * 1000);

    await NumberModel.findOneAndUpdate(
      {},
      { value: randomNumber },
      { upsert: true, new: true }
    );

    res.json({ number: randomNumber });
  } catch (error) {
    console.error("Error generating number:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// IMPORTANT: listen on all interfaces
app.listen(5000, "0.0.0.0", () => {
  console.log("Backend running on port 5000");
});

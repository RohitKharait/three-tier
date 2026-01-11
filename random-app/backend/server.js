const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

mongoose.connect("mongodb://mongo-db:27017/randomdb");

const NumberSchema = new mongoose.Schema({
  value: Number
});

const NumberModel = mongoose.model("Number", NumberSchema);

// API
app.get("/random", async (req, res) => {
  const randomNumber = Math.floor(Math.random() * 1000);

  await NumberModel.findOneAndUpdate(
    {},
    { value: randomNumber },
    { upsert: true }
  );

  res.json({ number: randomNumber });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});

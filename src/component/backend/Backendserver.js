import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.MONGODB_ATLAS_CONNECTION_STRING)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const DataSchema = new mongoose.Schema({
  filename: String,
  data: Array,
  uploadedAt: { type: Date, default: Date.now },
});

const DataModel = mongoose.model("OEEData", DataSchema);

app.post("/uploadData", async (req, res) => {
  try {
    const { filename, data } = req.body;
    console.log("Received Data:", data); // Log the data received in the backend

    if (!data || data.length === 0) {
      return res.status(400).json({ message: "No data to upload" });
    }

    const newData = new DataModel({ filename, data });
    await newData.save();
    res.status(200).json({ message: "Data successfully uploaded to MongoDB" });
  } catch (error) {
    console.error("Error uploading data:", error);
    res.status(500).json({ message: "Error uploading data", error });
  }
});

app.listen(5003, () => {
  console.log("Server running on port 5003");
});

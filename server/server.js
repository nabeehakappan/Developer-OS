const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.routes");
const notesRoutes = require("./routes/notes.routes");
const desktopRoutes = require("./routes/desktop.routes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/desktop", desktopRoutes);
app.get("/", (req, res) => {
  res.send("DevOS backend running");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
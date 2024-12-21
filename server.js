const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const itemRoutes = require('./itemRoutes')

dotenv.config();

const app = express();
const { MONGO_URI, PORT } = process.env;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', itemRoutes);


mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const itemRoutes = require("./itemRoutes");
const connectDB = require("./models/db"); 
dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", itemRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors({
    origin: process.env.CLIENT_URL,      // your frontend Netlify URL
  credentials: true
}));
app.use(express.json());

// app.use("/api/auth", require("./routes/authRoutes"));
    await api.post("/auth/forgot-password", { email });


app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

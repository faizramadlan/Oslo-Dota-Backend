if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = process.env.PORT || 4040;
const cors = require("cors");
const { router } = require("./routes/index");
const { logger,errorHandler } = require("./middlewares/index");

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.VITE_APP_URL || process.env.FRONTEND_URL || '*' // Fallback to * if user forgets to set env variable, though normally we restrict this to exact Vercel URL
    : '*',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
app.use(router);
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
app.use(errorHandler)
app.listen(port, () => {
  console.log(`Currently listening to localhost:${port}`);
});

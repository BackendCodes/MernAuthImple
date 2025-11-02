const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
// MUST load environment variables BEFORE importing modules that use them
dotenv.config();

const connectDB = require("./config/db");

const authroutes = require("./routes/authroutes");
const userroutes = require("./routes/userroutes");

const app = express();


// built in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// third party middlewares
app.use(cors({ credentials: true }));
app.use(cookieParser());

// configuring the dotenv to read the data from env files

const PORT = process.env.PORT || 3000;

// db connection
connectDB();

// routes
app.get("/", (req, res) => {
  res.send("you are at homepage");
});

app.use("/api/auth", authroutes);
app.use('/api/user',userroutes)

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

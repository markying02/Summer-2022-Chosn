const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config({ path: "../.env" });

// Set up web app and server
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Establish connection to mongoDB
const uri = `${process.env.ATLAS_URI}`;
const connectionString =
  "mongodb+srv://chosn:chosn@cluster0.scfwk.mongodb.net/users?retryWrites=true&w=majority";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log("mongo error ", err);
  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Load routers
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

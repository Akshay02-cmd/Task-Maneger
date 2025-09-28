const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const NotFound = require("./middleware/not-found")

//middlewares
app.use(express.json());
app.use(express.static('public'));

//routes
app.use("/api/v1/tasks", tasks);

app.use(NotFound)

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Task Manager App listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Could not connect to MongoDB...", error);
  }
};

start();

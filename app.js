const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const NotFound = require("./middleware/not-found");

//middlewares
app.use(express.json());
app.use(express.static('public'));

//routes
app.use("/api/v1/tasks", tasks);

app.get("/hello", (req, res) => {
  res.send("Welcome to the Task Manager App!");
});

// 404 middleware - must be LAST
app.use(NotFound);


const port = 3000;

const start = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI environment variable is required");
      process.exit(1);
    }
    
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

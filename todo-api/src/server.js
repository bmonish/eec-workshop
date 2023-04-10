const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://mongo:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Mongo Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.use(cors());

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World from my Docker Contaier");
});

app.use("/todo", require("./routes/todo.route"));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./config/keys");
const RecordRoute = require("./routes/record");

const app = express();

// Connect to Mongo
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use('/public', express.static('public'));

// Use Routes
app.use("/api/record", RecordRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
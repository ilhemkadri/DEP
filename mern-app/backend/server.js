const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;
mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error(err));

app.use("/api", require("./routes/api"));


app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

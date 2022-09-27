const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
dotenv.config();

//DB Connect
mongoose.connect(
  process.env.DB,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Successful Database Connection");
  }
);

//Frontend angular running
// app.use(express.static(__dirname + "/dist/restaurant-app"));
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "/dist/restaurant-app/index.html"));
// });

//MiddleWare
app.use(cors());
app.use(express.json());

//Express Router MiddleWare
const restaurantRoute = require("./Backend/router/route")
app.use("/appiontment", restaurantRoute);


app.listen(process.env.PORT || 8080, () => {
  console.log("server is running on port 8080");
});

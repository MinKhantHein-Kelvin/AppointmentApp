const mongoose = require("mongoose")

const appointmentSchemas = new mongoose.Schema({
  appointmentDate : String,
  name: String,
  email: String,
});

module.exports = mongoose.model("Appointment", appointmentSchemas);

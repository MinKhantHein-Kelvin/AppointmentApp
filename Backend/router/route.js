const router = require("express").Router();
const Appointment = require("../modal/appointment");


// read all Appointment
router.get("/", async (req, res) => {
  try {
    const readData = await Appointment.find();
    res.send(readData);
  } catch (error) {
    res.json({ message: error });
  }
});

// New Appointment
router.post("/", async (req, res) => {

  const existDate = await Appointment.findOne({ appointmentDate: req.body.appointmentDate });

  const createAppointment = new Appointment({
    appointmentDate : req.body.appointmentDate,
    name: req.body.name,
    email: req.body.email,
  });
  try {
    if (existDate) {
      return res.json({success : false, message : "No appointment avaliable on that date"})
    }
    const appoint = await createAppointment.save();
    res.json({success : true , message : `Save Successful appointment`, appointment : appoint});
  } catch (error) {
    res.json({success : false , message : "Couldn't save appointment!",error})
  }
});

// delete Appointment
router.delete("/:deleteId", async (req, res) => {
  try {
    const deletedata = await Appointment.findByIdAndRemove(req.params.deleteId);
    res.send(deletedata);
  } catch (error) {
    res.json({ message: error });
  }
});


module.exports = router;

import express from "express";
import Appointment from "../model/appointment.js";
import moment from "moment";

const appointmentController = express.Router();

const create = async (req, res) => {
  try {
    // doctorName = doctorId hai
    const { doctorName, patientName, patientPhone, dateAndTime } = req.body;

    if (!doctorName || !patientName || !patientPhone || !dateAndTime) {
      return res.status(400).send({ message: "Fields are required" });
    }
    console.log(req.body, "1231223");
    const appointmentTime = moment(dateAndTime, "YYYY-MM-DD HH:mm");

    const Timestart = moment(dateAndTime, "YYYY-MM-DD HH:mm").set({
      hour: 12,
      minute: 0,
    });
    const Timeend = moment(dateAndTime, "YYYY-MM-DD HH:mm").set({
      hour: 18,
      minute: 0,
    });

    if (
      appointmentTime.isBefore(Timestart) ||
      appointmentTime.isAfter(Timeend)
    ) {
      return res.status(400).send({
        message: "Appointments are available between 12:00 PM and 6:00 PM",
      });
    }

    if (appointmentTime.minute() % 30 !== 0) {
      return res
        .status(400)
        .send({ message: "Appointments booked in 30-minute interval" });
    }

    const booked = await Appointment.findOne({ dateAndTime: appointmentTime });

    if (booked) {
      return res.status(400).send({ message: "Slot is already booked" });
    }

    const appointment = new Appointment({
      doctorName,
      patientName,
      patientPhone,
      dateAndTime: appointmentTime,
      user: req.user._id,
    });

    const appointmentBook = await appointment.save();
    res
      .status(200)
      .send({ message: "Appointment is successfully booked", appointmentBook });
  } catch (err) {
    console.error("Error:", err);
    res.status(400).send({ error: err.message });
  }
};

const getAll = async(req,res) =>{

    try {
        const user = req.user
        console.log(user)
        if(user.isAdmin === false){
            const getAll = await Appointment.find({user}).populate("doctorName",{doctorName:1})
            console.log(getAll)
            if(getAll.length === 0){
                return res.status(400).send({message:"No Appointment To Show"})
            }

            if(getAll){
                 res.status(200).send({message:"All Appointments Are",getAll})
            }
            else{
                 res.status(400).send({message:"Something Error"});
            }
        }
        else if(user.isAdmin === true){
            const getAll = await Appointment.find({}).populate("doctorName",{doctorName:1})

            if(getAll.length === 0){
                return res.status(400).send({message:"No Appointment To Show"})
            }

            if(getAll){
                 res.status(200).send({message:"All Appointments Are",getAll})
            }
            else{
                 res.status(400).send({message:"Something Error"});
            }
        }

    } catch (err) {
    res.status(400).send({error:err.message})

    }

}


const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const getById = await Appointment.find({ user: id })
      .populate("doctorName", { doctorName: 1 })
      .populate("user", { name: 1 });

    if (getById === null) {
      return res.status(400).send({ message: "No Data To Show" });
    }

    if (getById) {
      res.status(200).send({ message: "Particular Appointment Is", getById });
    } else {
      res.status(400).send({ message: "Something wrong" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const getAvailableBookings = async (req, res) => {
  try {
    const { dateAndTime } = req.query;

    const momentDate = moment(dateAndTime, "YYYY-MM-DD");

    if (!momentDate.isValid()) {
      return res.status(400).send({ message: "Invalid date format" });
    }

    const startOfDay = momentDate
      .clone()
      .set({ hour: 12, minute: 0, second: 0 });
    const endOfDay = momentDate.clone().set({ hour: 18, minute: 0, second: 0 });

    const existingBookings = await Appointment.find({
      dateAndTime: { $gte: startOfDay.toDate(), $lt: endOfDay.toDate() },
    });

    console.log(dateAndTime, "111111");
    const maxBookings = 13;

    const bookedSlots = existingBookings.map((booking) =>
      moment(booking.dateAndTime).format("YYYY-MM-DD HH:mm:ss")
    );
    console.log(bookedSlots, "2222222");

    const availableSlots = [];

    for (let i = 0; i < maxBookings; i++) {
      const slotTime = startOfDay.clone().add(i * 30, "minutes");
      const slotTimeString = slotTime.format("YYYY-MM-DD HH:mm:ss");

      if (!bookedSlots.includes(slotTimeString)) {
        availableSlots.push(slotTimeString);
      }
    }

    res.status(200).send({ availableSlots });
  } catch (err) {
    console.error("Error:", err);
    res.status(400).send({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const { doctorName, patientName, patientPhone, date, time } = req.body;

    const update = await Appointment.findByIdAndUpdate(
      id,
      { doctorName, patientName, patientPhone, date, time },
      { new: true }
    );

    if (update === null) {
      return res.status(400).send({ message: "No Data To Update" });
    }

    if (update) {
      res.status(200).send({ message: "Appointment Updated", update });
    } else {
      res.status(400).send({ message: "Something Error" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const deleted = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Appointment.findByIdAndDelete(id);

    if (deleted === null) {
      return res.status(400).send({ message: "No Appointment To Delete" });
    }

    if (deleted) {
      res.status(200).send({ message: "Appointment Deleted" });
    } else {
      res.status(400).send({ message: "Something Wrong" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export default {
  create,
  getAll,
  getAvailableBookings,
  getById,
  update,
  deleted,
  appointmentController,
};

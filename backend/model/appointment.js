import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types

const appointmentSchema = new mongoose.Schema({

    doctorName:{
        type:ObjectId,
        ref:"Doctor"
    },
    dateAndTime: {
        type: Date,
      },
    specialization:{
        type:String
    },
    patientName :{
        type:String
    },
    patientPhone :{
        type:String
    },
    user:{
        type:ObjectId,
        ref:"Auth"
    }
})

const Appointment = mongoose.model('appointments',appointmentSchema);

export default Appointment
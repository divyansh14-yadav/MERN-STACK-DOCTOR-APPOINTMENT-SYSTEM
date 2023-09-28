import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types

const doctorSchema = new mongoose.Schema({
    
    doctorName: {
        type:String
    },
    doctorPhone:{
        type:String
    },
    email:{
        type:String
    },
    image:{
        type:String
    },
    specialization:{
        type:String
    },
    consultationFee:{
        type:String
    },
    timings:{
        type:String
    },
    experience:{
        type:String
    },
    description:{
        type:String
    },
    stateId:[{
        type:ObjectId,
        ref:'State'
    }],
    cityId:[{
        type:ObjectId,
        ref:'city'
    }]

})

const Doctor = mongoose.model('Doctor',doctorSchema);

export default Doctor
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({

    address:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    }
})

const Contact = mongoose.model("contact",contactSchema);

export default Contact;
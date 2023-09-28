import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    isAdmin:{
        default:false,
        type:Boolean
    },
    blocked: {
        type: Boolean,
        default: false
    },
})
const Auth = mongoose.model('Auth',authSchema);

export default Auth
import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({

    state:{
        type:String
    },
})

const State = mongoose.model("State",stateSchema);

export default State
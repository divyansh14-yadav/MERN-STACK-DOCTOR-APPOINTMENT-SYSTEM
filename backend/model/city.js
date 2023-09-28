import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types

const citySchema = new mongoose.Schema({

    city:{
      type:String
    },

    stateId: [
      {
        type: ObjectId,
        ref: "State", 
      },
    ],

})

const City = mongoose.model('city',citySchema)

export default City
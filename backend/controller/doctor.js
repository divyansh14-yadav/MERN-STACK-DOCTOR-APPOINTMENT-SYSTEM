import express from 'express';
import Doctor from '../model/doctor.js';

const doctorController = express.Router();

const create = async (req,res) =>{

    try {
    
    const {doctorName,doctorPhone,email,specialization,consultationFee,timings,experience,description,stateId,cityId} = req.body;

    let image = req.file.filename;
    if(!req.file){
        return  res.status(400).send({message:"please select the image"});
      }

    if(!doctorName ||!doctorPhone || !email || !specialization || !consultationFee || !experience || !description){
        return res.status(400).send({message:"Field is required"})
    }

    const doctor = await new Doctor({
        doctorName,
        doctorPhone,
        email,
        specialization,
        consultationFee,
        timings,
        image,
        experience,
        description,
        stateId,
        cityId
    })

    const doctorData = await doctor.save();

    res.status(200).send({message:"Doctor created successfully",doctorData})
} catch (err) {
    res.status(400).send({error:err.message})
    
}

}

const getAll = async(req,res) =>{

    try {
        const getAll = await Doctor.find({})
        .populate("stateId",{state:1})
        .populate("cityId",{city:1})

        if(getAll.length === 0){
            return res.status(400).send({message:"No Doctor To Show"})
        }
    
        if(getAll){
            res.status(200).send({message:"All Doctors are",getAll})
        }
        else{
            res.status(400).send({message:"Something Wrong"})
        }
    } catch (err) {
    res.status(400).send({error:err.message})
        
    }

}

const getById = async(req,res) =>{

    try {
        const {id} = req.params;

        const getById = await Doctor.findById(id)
        .populate("stateId",{state:1})
        .populate("cityId",{city:1})
        
        if(getById === null){
            return res.status(400).send({message:"No Doctor To Show"})
        }
    
        if(getById){
            res.status(200).send({message:"Particular Doctor Are",getById})
        }
        else{
            res.status(400).send({message:"Something Wrong"})
        }
    } catch (err) {
    res.status(400).send({error:err.message})
        
    }

}

const update = async (req, res) => {
    try {
      const { id } = req.params;
      const {doctorName,doctorPhone,email,specialization,consultationFee,timings,experience,description,stateId,cityId} = req.body;

      const image = req.file.filename; 
  
      const update = await Doctor.findByIdAndUpdate(
        id,
        { doctorName, doctorPhone, email, specialization, consultationFee, timings, experience, description, image, stateId, cityId }, 
        { new: true }
      );
  
      if (update === null) {
        return res.status(400).send({ message: "No Doctor To Update" });
      }
  
      if (update) {
        res.status(200).send({ message: "Doctor Is Updated", update });
      } else {
        res.status(400).send({ message: "Something Wrong" });
      }
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  };
  

const deleted = async(req,res) =>{

    try {
        const {id} =req.params

        const deleted = await Doctor.findByIdAndDelete(id)
    
        if(deleted === null){
            return res.status(400).send({message:"No Doctor To Deleted"})
        }
    
        if(deleted){
            res.status(200).send({message:"Doctor Deleted"})
        }
        else{
            res.status(400).send({message:"Something Wrong"})
        }
    } catch (err) {
    res.status(400).send({error:err.message})
        
    }

}

const doctorSearch = async (req, res) => {
    try {
      const { stateId, cityId, doctorName } = req.query;
      console.log(stateId, "stateId");
      console.log(cityId, "cityId");
      console.log(doctorName, "doctorName");
      if(!stateId || !cityId || !doctorName){
        return res.status(400).send({message:"Field is required"})
      }
  
      const data = {};
  
      if (doctorName) {
        data.doctorName = doctorName;
      }
  
      if (stateId) {
        data.stateId = stateId;
      }
  
      if (cityId) {
        data.cityId = cityId;
      }
  
      const doctors = await Doctor.find(data);
  
      if (doctors.length === 0) {
        res.status(400).send({message:"No doctors found"});
      } else {
        res.status(200).send({message:"Your search result is",doctors});
      }
    } catch (err) {
      res.status(400).send({error:err.message});
    }
  };
  


export default {create,
                getAll,
                getById,
                update,
                deleted,
                doctorSearch,
                doctorController}
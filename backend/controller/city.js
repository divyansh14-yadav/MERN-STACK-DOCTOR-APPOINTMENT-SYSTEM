import express from 'express';
import City from '../model/city.js';

const cityController = express.Router()

const create = async (req,res) =>{

    try {
        const {city,stateId} = req.body;

        if(!city || !stateId){
            return res.status(400).send({message:"Field is required"})
        }

        const cityData = await City.findOne({city})

        if(cityData){
            return res.status(400).send({message:"Please select anather city"})
        }
    
        const createCity =  await new City({
            city,stateId
        })
    
        const saveCity = await createCity.save();
    
        res.status(200).send({message:"City created successfully",saveCity})
    } catch (err) {
        res.status(400).send({error:err.message})
    }

}

const getAllstatecity = async(req,res) =>{

    try {
        const {stateId} = req.query;
        const getAll = await City.find({stateId}).populate('stateId',{state:1})

        if(getAll === stateId){
         res.status(400).send({message:"not matched"})
        }

        if(getAll.length === 0){
            return res.status(400).send({message:"No data to show"})
        }
    
        if(getAll){
            res.status(200).send({message:"All city are",getAll})
        }
    
        else{
            res.status(400).send({message:"Something wrong"})
        }
    } catch (err) {
        res.status(400).send({error:err.message})
    }

}

const getAll = async(req,res) =>{

    try {
        const getAll = await City.find({}).populate('stateId',{state:1})

        if(getAll.length === 0){
            return res.status(400).send({message:"No data to show"})
        }
    
        if(getAll){
            res.status(200).send({message:"All city are",getAll})
        }
    
        else{
            res.status(400).send({message:"Something wrong"})
        }
    } catch (err) {
        res.status(400).send({error:err.message})
    }

}

const getById = async(req,res) =>{

    try {
        const {id} = req.params;

    const getById = await City.findById(id).populate('stateId',{state:1})

    if(getById === null){
        return res.status(400).send({message:"No data to show"})
    }

    if(getById){
        res.status(200).send({message:"Particular city are",getById})
    }
    else{
        res.status(400).send({message:"Somthing wrong"})
    }
    } catch (err) {
        res.status(400).send({error:err.message})
    }
    
}

const deleted = async(req,res) =>{

    try {
        const {id} = req.params;

        const deleted = await City.findByIdAndDelete(id)
    
        if(deleted === null){
            return res.status(400).send({message:"No data to delete"})
        }
    
        if(deleted){
            res.status(400).send({message:"City deleted"})
        }
        else{
            res.status(400).send({message:"Something wrong"})
        }
    } catch (err) {
        res.status(400).send({error:err.message})
    }

}

export default {create,
                getAll,
                getById,
                deleted,
                getAllstatecity,
                cityController}
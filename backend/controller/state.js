import express from 'express';
import State from '../model/state.js';

const stateController = express.Router()

const create = async(req,res) =>{

    try {
        const {state} = req.body;

        if(!state ){
            return res.status(400).send({message:"Field is required"})
        }
    
        const createState = await new State({
            state
        })
    
        const states = await createState.save();
    
        res.status(200).send({message:"State added succesfully",createState})
    } catch (err) {
        res.status(400).send({error:err.message})
    }

}

const getAll = async(req,res) =>{

    try {
        const getAll = await State.find({})

        if(getAll.length === 0){
            return res.status(400).send({message:"No data to show"})
        }
    
        if(getAll){
            res.status(200).send({message:"All states are",getAll})
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

        const getById = await State.findById(id)
    
        if(getById === null){
            return res.status(400).send({message:"No data to show"})
        }
    
        if(getById){
            res.status(200).send({message:"Particular state are",getById})
        }
        else{
            res.status(400).send({message:"Something wrong"})
        }
    } catch (err) {
        res.status(400).send({error:err.message})
    }

}

const deleted = async(req,res) =>{

    try {
        const {id} = req.params;

        const deleted = await State.findByIdAndDelete(id)
    
        if(deleted === null){
            return res.status(400).send({message:"No data to delete"})
        }
    
        if(deleted){
            res.status(200).send({message:"Data deleted"})
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
                stateController}
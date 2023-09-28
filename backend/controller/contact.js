import express from 'express';
import Contact from '../model/contact.js';

const contactController = express.Router();

const create = async(req,res) =>{

    try {
        const {address,email,phone} = req.body;

        if(!address || !email || !phone){
            return res.status(400).send({message:"Field is required"})
        }
    
        const contact = new Contact({
            address,email,phone
        })

        const data = await Contact.findOne({email})

        if(data){
            return res.status(400).send({message:"Email is same"})
        }
    
        const contactData = await contact.save();
    
        res.status(200).send({message:"contact is",contactData})
    } catch (err) {
        res.status(400).send({error:err.message});
    }

}

const getAll = async(req,res) =>{

    try {
        const getAll = await Contact.find({})

        if(getAll.length === 0){
            return res.status(400).send({message:"No data to show"})
        }
    
        if(getAll){
            res.status(200).send({message:"your contacts are",getAll})
        }
        else{
            res.status(400).send({message:"Something wrong"})
        }
    } catch (err) {
        res.status(400).send({error:err.message})
    }

}

const getById = async (req,res) =>{

    try {
        const {id} = req.params;
        const getById = await Contact.findById(id)
    
        if(getById === null){
            return res.status(400).send({message:"No data to show"})
        }
        if(getById){
            res.status(200).send({message:"particular contact are",getById})
        }
        else{
            res.status(400).send({message:"Something wrong"})
        }
    } catch (err) {
        res.status(400).send({error:err.message})
    }

}

const update = async(req,res) =>{

    try {
        const {id} = req.params;

        const {address,email,phone} = req.body;

        const updateContact = await Contact.findByIdAndUpdate(id,{address,email,phone},{new:true})
    
        if(updateContact === null){
            return res.status(400).send({message:"No data to update"})
        }
    
        if(updateContact){
            res.status(200).send({message:"updated data is",updateContact})
        }
        else{
            res.status(400).send({message:"Something wrong"})
        }
    } catch (err) {
        res.status(400).send({error:err.message})
    }
}

const distroy = async(req,res) =>{

    try {
        const {id} = req.params;

        const distroy = await Contact.findByIdAndDelete(id)
    
        if(distroy === null){
            return res.status(400).send({message:"No data to delete"})
        }
    
        if(distroy){
            res.status(400).send({message:"data deleted"})
        }
        else{
            res.status(400).send({message:"Something wrong"})
        }
    } catch (err) {
        res.status(400).send({error:err.message})
    }

}

export default {create,getAll,getById,update,distroy,contactController}
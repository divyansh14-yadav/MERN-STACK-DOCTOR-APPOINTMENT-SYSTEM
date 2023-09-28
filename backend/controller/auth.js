import express from 'express';
import Auth from '../model/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const authContoller = express.Router();

const register = async(req,res) =>{

    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).send({message:"Field Is Required"})
        }
    
        const auth = await Auth.findOne({email}) 
    
        if(auth){
           return res.status(400).send({message:"User Already Exists With This Email Address"})
        }
    
        const dpass= await bcrypt.hash(password,10)
    
        const user = new Auth({
            name,email,password:dpass
        })
    
        const userData = await user.save()
    
        res.status(200).send({message:"Registration Successfully Done",userData})
    } catch (err) {
    res.status(400).send({error:err.message})
        
    }

}

const login =async(req,res)=>{
  try {

    const {email,password}= req.body

    if(!email || !password ){
       return res.status(400).send({message:"field is required"})
    }

    const user = await Auth.findOne({email})

    if(!user){
       return res.status(400).send({message:"email not found"})
    }
   
    // if(password != confirmPassword){
    //     return res.status(400).send({message:"Password not matched"})
    // }

    const checkPassword = await bcrypt.compare(req.body.password,user.password)

    if(!checkPassword){
       return res.status(400).send({message:"password invalid"})
    }

    // if(!user.isVerified){
    //     return res.status(400).send({message:"you are not verfied"})
    // }

    if(user.blocked === true){
        return res.status(400).send({message:"user is blocked"});
    }

    if(user.isAdmin === false){

        const users = await bcrypt.compare(req.body.password,user.password)

    

    const token = jwt.sign(
        { _id: user._id, email },
        process.env.SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

    user.token = token
    let _id = user._id

    const data = await user.save();
    res.status(200).send({message:"User logged In",email,token,_id})
    }
    else if(user.isAdmin === true){
        const admin = await bcrypt.compare(req.body.password,user.password)

        const token = jwt.sign(
            { _id: user._id, email },
            process.env.SECRET_KEY,
            {
              expiresIn: "24h",
            }
          );
    
        user.token = token
        let _id = user._id
    
        const data = await user.save();
        res.status(200).send({message:"admin logged In",email,token,_id})
    }
  } catch (err) {
    res.status(400).send({error:err.message});

    
  }

}


const getAllUser = async(req,res) =>{

  try {
    const getAllUser = await Auth.find({})

    if(getAllUser.length === 0){
      return res.status(400).send({message:"No User To Show"})
    }
    if(getAllUser){
      res.status(200).send({message:"all user are",getAllUser})
    }
    else{
      res.status(400).send({message:"Something wrong"})
    }
  } catch (err) {
     res.status(400).send({error:err.message})

  }

}

const getByIdUser = async(req,res) =>{
  
  try {
    const {id} = req.params;
  
  const getByIdUser = await Auth.findById(id)
  
  if(getByIdUser === null){
    return res.status(400).send({message:"No Data To Show"})
  }

  if(getByIdUser){
    res.status(200).send({message:"Particular User Data Is",getByIdUser})
  }
  else{
    res.status(400).send({message:"Something Wrong"})
  }
  } catch (err) {
    res.status(400).send({error:err.message})
    
  }
}

const updateUser = async (req,res) =>{

  try {
    const {id} = req.params;

    const {name,email} = req.body;
  
    const updateUser = await Auth.findByIdAndUpdate(id,{name,email},{new:true})
  
    if(updateUser === null){
      return res.status(400).send({message:"No data to update"})
    }
  
    if(updateUser){
      res.status(200).send({message:"User data updated",updateUser})
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

    const deleted =  await Auth.findByIdAndDelete(id)
  
    if(deleted === null){
      return res.status(400).send({message:"No user data to deleted"})
    }
  
    if(deleted){
      res.status(200).send({message:"User data deleted"})
    }
    else{
      res.status(400).send({message:"Something wrong"})
    }
  } catch (err) {
    res.status(400).send({error:err.message})
    
  }

}

const block = async(req,res) =>{

  try {
    const {id} = req.params;

    const user = await Auth.findById(id)
  
    if(!user){
      return res.status(400).send({message:"User not found"})
    }
    if(user.blocked === true){
      return res.status(400).send({message:"User already blocked"})
    }
    user.blocked = true
  
    await user.save();
  
    res.status(200).send({message:"User is blocked"})
  } catch (error) {
    res.status(400).send({error:err.message})

  }

}

const unBlock = async(req,res) =>{

  try {
    const {id} = req.params;

    const user = await Auth.findById(id)
  
    if(!user){
      return res.status(400).send({message:"User not found"})
    }
    if(user.blocked === false){
      return res.status(400).send({message:"User already unBlocked"})
    }
    user.blocked = false
  
    await user.save();
  
    res.status(200).send({message:"User is unblocked"})
  } catch (error) {
    res.status(400).send({error:err.message})

  }

}

const resetUserPasswordRequest = async (req, res) => {
        try {
      
          const email = req.body.email;
      
          const user = await Auth.findOne({ email });
          console.log(user);
      
          if (user) {
            const newpassword = await bcrypt.hash(user.password, 10);
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                //   host: "smtp.gmail.com",
                user: process.env.MAIL_USERNAME, // gmail id
                pass: process.env.MAIL_PASSWORD,
              },
            });
      
            let mailOptions = {
              from: process.env.MAIL_USERNAME,
              to: email,
              subject: "PASSWORD RESET EMAIL",
              text: `LINK FOR THE PASSWORD RESET IS http://localhost:3000/forgetPassword?email=${email}`,
            };
            transporter.sendMail(mailOptions, function (err, data) {
              if (err) {
                res.status(400).send({error:err.message})
                console.log("Error", err);
              } else {
                    res.status(200).send({message:"Email sent successfully"})
                    console.log("Email sent successfully");
              }
            });
          }
        } catch (err) {
          res.render("resetPasswordRequest", { message: "Something error" });
        }
      };
      
const resetPassword = async(req,res)=>{

        try {
          const {email,password} = req.body;
      
          if(!email || !password){
         res.status(400).send({message:"Field is required"})
        }
        
          const user = await Auth.findOne({email})
        
          if(!user){
            res.status(400).send({message:"User not found"})
          }
        
          const dpass = await bcrypt.hash(password,10)
        
          user.password = dpass
        
          await user.save();
        
          res.status(200).send({message:"Password changed success"})
        } catch (err) {
          res.status(400).send({error:err.message });
          
        }
      
      }

export default {register,
                login,
                getAllUser,
                getByIdUser,
                updateUser,
                deleted,
                block,
                unBlock,
                resetUserPasswordRequest,
                resetPassword,
                authContoller}
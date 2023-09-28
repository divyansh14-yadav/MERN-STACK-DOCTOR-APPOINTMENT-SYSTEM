import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Auth from '../model/auth.js';
dotenv.config();


const adminAuth = async(req,res,next) =>{
 
        try {
          const token = req.headers.authorization.split(" ")[1];
          const verify = jwt.verify(token, process.env.SECRET_KEY);
          const {_id} = verify

          const userdata = await Auth.findById(_id);

          const isAdmin =userdata
          
          console.log(isAdmin);
      
          if (!isAdmin) {
            return res.status(400).send({ message: "you are not admin" });
          }
      
          next();
        } catch (error) {
          res.status(400).send({ message: error.message });
        }
      };
    


export default adminAuth
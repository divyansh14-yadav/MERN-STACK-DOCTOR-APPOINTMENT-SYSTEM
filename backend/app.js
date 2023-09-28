import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import * as path from 'path';
import * as url from 'url';
import ejs from 'ejs';
import authRoute from './routes/auth.js';
import appointmentRoute from './routes/appointment.js';
import doctorRoute from './routes/doctor.js';
import stateRoute from './routes/state.js';
import cityRoute from './routes/city.js';
import contactRoute from './routes/contact.js';

dotenv.config();

const app = express();

const __dirname=url.fileURLToPath(new URL('.',import.meta.url));

app.use(express.json());

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));

app.use('/auth',authRoute);
app.use('/appointment',appointmentRoute);
app.use('/doctor',doctorRoute);
app.use('/state',stateRoute);
app.use('/city',cityRoute);
app.use('/contact',contactRoute);

app.use("/images", express.static(path.join(__dirname, "/images")));

app.use(express.static(`${__dirname}/images`));

app.set('view engine','ejs');

app.get((req,res)=>{
    res.send("SERVER STARTED")
})

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected To Database");
}).catch(()=>{
    console.log("Something Error Or Network Issue");
})

app.listen(5001);

console.log("Server Started At Port 5001");
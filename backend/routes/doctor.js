import express from 'express';
import doctorController from '../controller/doctor.js';
import upload from '../middleware/image.js';
import adminAuth from '../middleware/admin.js';

const doctorRoute = express.Router();

doctorRoute.post('/create',upload,adminAuth,doctorController.create);

doctorRoute.get('/get',doctorController.getAll);

doctorRoute.get('/get/:id',doctorController.getById);

doctorRoute.put('/update/:id',upload,adminAuth,doctorController.update);

doctorRoute.delete('/distroy/:id',adminAuth,doctorController.deleted);

doctorRoute.get('/doctorSearch',doctorController.doctorSearch);


export default doctorRoute

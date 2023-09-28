import express from 'express';
import appointmentController from '../controller/appointment.js';
import verifyToken from '../middleware/auth.js';
import adminAuth from '../middleware/admin.js';

const appointmentRoute = express.Router();

appointmentRoute.post('/create',verifyToken,adminAuth,appointmentController.create);

appointmentRoute.get('/get',verifyToken,adminAuth,appointmentController.getAll);

appointmentRoute.get('/get/:id',verifyToken,adminAuth,appointmentController.getById);

appointmentRoute.get('/getAvailableAppointments',appointmentController.getAvailableBookings);

appointmentRoute.put('/update/:id',verifyToken,adminAuth,appointmentController.update);

appointmentRoute.delete('/distroy/:id',verifyToken,adminAuth,appointmentController.deleted);


export default appointmentRoute;
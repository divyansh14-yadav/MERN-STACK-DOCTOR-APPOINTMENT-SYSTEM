import express from 'express';
import contactController from '../controller/contact.js';
import adminAuth from '../middleware/admin.js';

const contactRoute = express.Router();

contactRoute.post('/create',adminAuth,contactController.create);

contactRoute.get('/getAll',contactController.getAll);

contactRoute.get('/getById/:id',adminAuth,contactController.getById);

contactRoute.put('/update/:id',adminAuth,contactController.update);

contactRoute.delete('/delete/:id',adminAuth,contactController.distroy);

export default contactRoute
import express from 'express';
import cityController from '../controller/city.js'
import adminAuth from '../middleware/admin.js';

const cityRoute = express.Router();

cityRoute.post('/create',cityController.create); ///city

cityRoute.get('/getAll',cityController.getAll); ///city

cityRoute.get('/getById/:id',cityController.getById); ///city/:id

cityRoute.delete('/delete/:id',cityController.deleted); //city/:id

cityRoute.get('/getAllstatecity',cityController.getAllstatecity);


export default cityRoute
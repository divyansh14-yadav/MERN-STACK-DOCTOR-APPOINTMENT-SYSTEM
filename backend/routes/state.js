import express from 'express';
import stateController from '../controller/state.js';
import adminAuth from '../middleware/admin.js';
const stateRoute = express.Router();

stateRoute.post('/create',stateController.create);

stateRoute.get('/getAll',stateController.getAll);

stateRoute.get('/getById/:id',stateController.getById);

stateRoute.delete('/deleted/:id',stateController.deleted);

export default stateRoute
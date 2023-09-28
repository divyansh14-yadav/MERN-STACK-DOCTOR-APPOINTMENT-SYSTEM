import express from 'express';
import authController from '../controller/auth.js';
import verifyToken from '../middleware/auth.js';
import adminAuth from '../middleware/admin.js';

const authRoute = express.Router();

authRoute.post('/register',authController.register);

authRoute.post('/login',authController.login);

authRoute.get('/getAll',adminAuth,authController.getAllUser);

authRoute.get('/getById/:id',verifyToken,authController.getByIdUser);

authRoute.put('/update/:id',verifyToken,authController.updateUser);

authRoute.delete('/distroy/:id',adminAuth,authController.deleted);

authRoute.post('/block/:id',adminAuth,authController.block);

authRoute.post('/unblock/:id',adminAuth,authController.unBlock);

authRoute.post('/forgetPasswordRequest',authController.resetUserPasswordRequest);

authRoute.post('/forgetPassword',authController.resetPassword);

export default authRoute
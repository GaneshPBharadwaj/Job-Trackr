import express from 'express';
import UserController from '../controller/user.controller.js';

const userRoutes = express.Router();

const userController = new UserController();

userRoutes.post('/register', (req, res, next) => {
    userController.register(req, res, next)
});

userRoutes.post('/login', (req, res, next)=>{
    userController.logIn(req, res, next);
});

userRoutes.delete('/logout', (req, res, next)=>{
    userController.logOut(req, res, next);
})

userRoutes.get('/dashboardStats', (req, res, next)=>{
    userController.dashBoardStats(req, res, next);
})



export default userRoutes;
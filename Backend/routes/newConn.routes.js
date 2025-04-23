import express from 'express';
import NewConnController from '../controller/newConn.controller.js';
import jwtAuth from '../config/jwtMiddleware.js';

const newConnRoutes = express.Router();

const newConnController = new NewConnController();

newConnRoutes.post('/addConn', jwtAuth, (req, res, next) => {
    newConnController.addConn(req, res, next)
});

newConnRoutes.get('/connStat', jwtAuth, (req, res, next)=>{
    newConnController.connStats(req, res, next);
});

newConnRoutes.get('/connByComp', jwtAuth, (req, res, next)=>{
    newConnController.connByComp(req, res, next);
});

newConnRoutes.get('/singleConn', jwtAuth, (req, res, next)=>{
    newConnController.singleConn(req, res, next);
});

newConnRoutes.get('/allConn', jwtAuth, (req, res, next)=>{
    newConnController.allConn(req, res, next);
});

export default newConnRoutes;
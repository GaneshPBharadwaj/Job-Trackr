import express from 'express';
import IntController from '../controller/int.controller.js';
import jwtAuth from '../config/jwtMiddleware.js';

const intRoutes = express.Router();

const intController = new IntController();

intRoutes.post('/addInt', jwtAuth, (req, res, next) => {
    intController.addInt(req, res, next)
});

intRoutes.get('/intStat', jwtAuth, (req, res, next)=>{
    intController.intStats(req, res, next);
});

intRoutes.get('/intByComp', jwtAuth, (req, res, next)=>{
    intController.intByComp(req, res, next);
});

intRoutes.get('/singleInt', jwtAuth, (req, res, next)=>{
    intController.singleInt(req, res, next);
});

intRoutes.get('/allInt', jwtAuth, (req, res, next)=>{
    intController.allInt(req, res, next);
});

export default intRoutes;
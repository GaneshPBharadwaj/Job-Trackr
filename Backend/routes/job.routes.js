import express from 'express';
import JobController from '../controller/job.controller.js';
import jwtAuth from '../config/jwtMiddleware.js';

const jobRoutes = express.Router();

const jobController = new JobController();

jobRoutes.post('/addJob', jwtAuth, (req, res, next) => {
    jobController.addJob(req, res, next)
});

jobRoutes.get('/jobStat', jwtAuth, (req, res, next)=>{
    jobController.jobStats(req, res, next);
});

jobRoutes.get('/jobByComp', jwtAuth, (req, res, next)=>{
    jobController.appByComp(req, res, next);
});

jobRoutes.get('/singleJob', jwtAuth, (req, res, next)=>{
    jobController.singleJob(req, res, next);
});

jobRoutes.get('/allJob', jwtAuth, (req, res, next)=>{
    jobController.allJobs(req, res, next);
});

export default jobRoutes;
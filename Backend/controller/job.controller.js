import JobRepository from "../repository/job.repository.js";

export default class JobController{

    constructor(){
        this.jobRepository = new JobRepository();
    }

    async allJobs(req, res, next){
        const userId = req.userId;

        try {
            const jobData = await this.jobRepository.getAll(userId);
            res.status(200).json({message: 'all jobs', jobData})

        } catch (error) {
            console.error(err);
            res.status(500).json({ message: 'Error finding job application' });
        }
    }

    async addJob(req, res, next){
        const userId = req.userId;
        const jobData = req.body;

        try{
            const jobApp = {
                userId, // Attach userId from JWT
                date: jobData.date || new Date(),
                position: jobData.position,
                company: jobData.company,
                location: jobData.location,
                status: jobData.status || 'Applied', // Default status
                appSource: jobData.appSource,
            };
            const newJob = await this.jobRepository.addJob(jobApp);
            res.status(201).json({ message: 'Job Applied', newJob});
        }catch(err){
            console.error(err);
            res.status(500).json({ message: 'Error adding job application' });
        }
    }

    async jobStats(req, res, next){
        const userId = req.userId;
        try {
            const jobStat = await this.jobRepository.jobStats(userId);
            res.status(201).json({ message: 'latest jobs', jobStat});
        } catch (error) {
            console.error(err);
            res.status(500).json({ message: 'Error finding latest job application' });
        }
    }

    async appByComp(req, res, next){
        const userId = req.userId;
        const company = req.params.company;

        try {
            const filterdJob = await this.jobRepository.jobByComp(userId, company);
            res.status(201).json({ message: 'filtered jobs', filterdJob});
        } catch (error) {
            console.error(err);
            res.status(500).json({ message: 'Error finding job application by company' });
        }

    }

    async singleJob(req, res, next){
        const jobId = req.params.jobId;

        try {
            const filterdJob = await this.jobRepository.filterSingleApp(jobId);
            res.status(201).json({ message: 'filtered jobs', filterdJob});
        } catch (error) {
            console.error(err);
            res.status(500).json({ message: 'Error finding filtered job application' });
        }
    }
}
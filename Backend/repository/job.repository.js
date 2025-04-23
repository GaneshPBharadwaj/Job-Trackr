import { JobModel } from "../schema/job.schema.js";

export default class JobRepository{

    async getAll(userId){
        try {
            const jobData = await JobModel.find({userId : userId});
            return jobData;
        } catch (error) {
            console.log(" error finding the jobs", error)
        }
    }

    async addJob(jobApp){
        try {
            const newJobApp = await JobModel.create(jobApp);
            return newJobApp
        } catch (error) {
            console.error('Error creating Job Application: ', error);
            throw error;
        }
    }

    async jobStats(userId){

        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const weekStart = new Date();
            weekStart.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
            weekStart.setHours(0, 0, 0, 0);

            // Get Last 10 Jobs (Sorted by latest)
            const last10Jobs = await JobModel.find({userId: userId}).sort({ createdAt: -1 }).limit(10);

            //total jobs applied
            const totalJobs = await JobModel.countDocuments({userId: userId});

            // Jobs in the Current Week
            const weekJobs = await JobModel.countDocuments({userId: userId, date: { $gte: weekStart } });

            // Jobs for the Current Day
            const todayJobs = await JobModel.countDocuments({userId: userId, date: { $gte: today } });

            return { last10Jobs, totalJobs, weekJobs, todayJobs};

        } catch (error) {
            console.error('Error fetching job stats:', error);
            throw error;
        }
    }

    async jobByComp(userId, company){
        try {
            const jobApps = await JobModel.find({userId: userId ,company: company});
            return jobApps
        } catch (error) {
            console.error('Error fetching job Applications:', error);
            throw error;
        }
    }

    async filterSingleApp(jobId){
        try {
            const jobApp = await JobModel.findOne({ _id: jobId }); // Find by custom criteria
            return jobApp;
        } catch (error) {
            console.error('Error fetching job application:', error);
            throw error;
        }
    }
}
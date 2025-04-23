import { IntModel } from "../schema/interview.schema.js";

export default class IntRepository{

    async getAll(userId){
            try {
                const intData = await IntModel.find({userId : userId});
                return intData;
            } catch (error) {
                console.log(" error finding the interviews", error)
            }
    }

    async addInt(int){
        try {
            const newInt = await IntModel.create(int);
            console.log(newInt)
            return newInt
        } catch (error) {
            console.error('Error creating Interview: ', error);
            throw error;
        }
    }

    async intStats(userId){

        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const weekStart = new Date();
            weekStart.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
            weekStart.setHours(0, 0, 0, 0);

            // Get Last 10 Jobs (Sorted by latest)
            const last10Int = await IntModel.find({userId: userId}).sort({ createdAt: -1 }).limit(10);

            //total jobs applied
            const totalInt = await IntModel.countDocuments({userId: userId});

            // Jobs in the Current Week
            const weekInt = await IntModel.countDocuments({userId: userId, date: { $gte: weekStart } });

            // Jobs for the Current Day
            const todayInt = await IntModel.countDocuments({userId: userId, date: { $gte: today } });

            return { last10Int, totalInt, weekInt, todayInt};

        } catch (error) {
            console.error('Error fetching Interview stats:', error);
            throw error;
        }
    }

    async intByComp(userId, company){
        try {
            const intByComp = await IntModel.find({userId: userId ,company: company});
            return intByComp
        } catch (error) {
            console.error('Error fetching Interview:', error);
            throw error;
        }
    }

    async filterInterview(intId){
        try {
            const interview = await IntModel.findOne({ _id: intId }); // Find by custom criteria
            return interview;
        } catch (error) {
            console.error('Error fetching Interview:', error);
            throw error;
        }
    }
}
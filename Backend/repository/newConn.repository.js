import { NewConnModel } from "../schema/newConn.schema.js";

export default class NewConnRepository{

    async getAll(userId){
        try {
            const connData = await NewConnModel.find({userId : userId});
            return connData;
        } catch (error) {
            console.log(" error finding the connections", error)
        }
    }

    async addConn(Conn){
        try {
            const newConn = await NewConnModel.create(Conn);
            return newConn
        } catch (error) {
            console.error('Error creating new Connection: ', error);
            throw error;
        }
    }

    async connStats(userId){

        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const weekStart = new Date();
            weekStart.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
            weekStart.setHours(0, 0, 0, 0);

            // Get Last 10 Jobs (Sorted by latest)
            const last10Conn = await NewConnModel.find({userId: userId}).sort({ createdAt: -1 }).limit(10);

            //total jobs applied
            const totalConn = await NewConnModel.countDocuments({userId: userId});

            // Jobs in the Current Week
            const weekConn = await NewConnModel.countDocuments({userId: userId, date: { $gte: weekStart } });

            // Jobs for the Current Day
            const todayConn = await NewConnModel.countDocuments({userId: userId, date: { $gte: today } });

            return { last10Conn, totalConn, weekConn, todayConn};

        } catch (error) {
            console.error('Error fetching New Connections stats:', error);
            throw error;
        }
    }

    async connByComp(userId, company){
        try {
            const connByComp = await NewConnModel.find({userId: userId ,company: company});
            return connByComp
        } catch (error) {
            console.error('Error fetching connections:', error);
            throw error;
        }
    }

    async filterConn(connId){
        try {
            const connection = await NewConnModel.findOne({ _id: connId }); // Find by custom criteria
            return connection;
        } catch (error) {
            console.error('Error fetching connections:', error);
            throw error;
        }
    }
}
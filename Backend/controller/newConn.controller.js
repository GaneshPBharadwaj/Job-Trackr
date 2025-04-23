// import IntRepository from "../repository/int.repository.js";
import NewConnRepository from "../repository/newConn.repository.js";

export default class NewConnController{

    constructor(){
        this.newConnRepository = new NewConnRepository();
    }

    async allConn(req, res, next){
        const userId = req.userId;

        try {
            const connData = await this.newConnRepository.getAll(userId);
            res.status(200).json({message: 'all connections', connData})

        } catch (error) {
            console.error(err);
            res.status(500).json({ message: 'Error finding connections' });
        }
    }

    async addConn(req, res, next){
        const userId = req.userId;
        const newConnData = req.body;

        try{
            const connections = {
                userId, // Attach userId from JWT
                date: newConnData.date || new Date(),
                name: newConnData.name,
                position: newConnData.position,
                company: newConnData.company,
            };
            const newConn = await this.newConnRepository.addConn(connections);
            res.status(201).json({ message: 'New connection created', newConn});
        }catch(err){
            console.error(err);
            res.status(500).json({ message: 'Error adding connection' });
        }
    }

    async connStats(req, res, next){
        const userId = req.userId;
        try {
            const connStat = await this.newConnRepository.connStats(userId);
            res.status(201).json({ message: 'latest connections', connStat});
        } catch (error) {
            console.error(err);
            res.status(500).json({ message: 'Error finding latest connections' });
        }
    }

    async connByComp(req, res, next){
        const userId = req.userId;
        const company = req.params.company;

        try {
            const filterdConn = await this.newConnRepository.connByComp(userId, company);
            res.status(201).json({ message: 'filtered connections', filterdConn});
        } catch (error) {
            console.error(err);
            res.status(500).json({ message: 'Error finding connections by company' });
        }

    }

    async singleConn(req, res, next){
        const connId = req.params.connId;

        try {
            const filterdConn = await this.newConnRepository.filterConn(connId);
            res.status(201).json({ message: 'filtered connections', filterdConn});
        } catch (error) {
            console.error(err);
            res.status(500).json({ message: 'Error finding filtered connections' });
        }
    }
}
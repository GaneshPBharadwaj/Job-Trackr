import IntRepository from "../repository/int.repository.js";

export default class IntController{

    constructor(){
        this.intRepository = new IntRepository();
    }

    async allInt(req, res, next){
        const userId = req.userId;

        try {
            const intData = await this.intRepository.getAll(userId);
            res.status(200).json({message: 'all interviews', intData})

        } catch (error) {
            console.error(err);
            res.status(500).json({ message: 'Error finding interview' });
        }
    }

    async addInt(req, res, next) {
        const userId = req.userId;
        const { date, position, company, timings } = req.body;
    
        try {
            if (!timings || !timings.from || !timings.to || !date) {
                return res.status(400).json({ message: 'Missing date or timings' });
            }
    
            // Destructure and prepare Date objects
            const { from, to, ...restTimings } = timings;
    
            const fromDate = new Date(`${date}T${from}`);
            const toDate = new Date(`${date}T${to}`);
    
            const interview = {
                userId,
                date: new Date(date),
                position,
                company,
                timings: {
                    ...restTimings,
                    from: fromDate,
                    to: toDate,
                    date: new Date(date),
                },
            };
    
            const newInt = await this.intRepository.addInt(interview);
            console.log(newInt);
            res.status(201).json({ message: 'Interview created successfully', data: newInt });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to create interview' });
        }
    }

    async intStats(req, res, next){
        const userId = req.userId;
        try {
            const intStat = await this.intRepository.intStats(userId);
            res.status(201).json({ message: 'latest interviews', intStat});
        } catch (error) {
            console.error(err);
            res.status(500).json({ message: 'Error finding latest Interview' });
        }
    }

    async intByComp(req, res, next){
        const userId = req.userId;
        const company = req.params.company;

        try {
            const filterdInt = await this.intRepository.intByComp(userId, company);
            res.status(201).json({ message: 'filtered Interview', filterdInt});
        } catch (error) {
            console.error(err);
            res.status(500).json({ message: 'Error finding Interview by company' });
        }

    }

    async singleInt(req, res, next){
        const intId = req.params.intId;

        try {
            const filterdInt = await this.intRepository.filterInterview(intId);
            res.status(201).json({ message: 'filtered Interview', filterdInt});
        } catch (error) {
            console.error(err);
            res.status(500).json({ message: 'Error finding filtered Interview' });
        }
    }
}
import UserRepository from "../repository/user.repository.js";
import jwt from 'jsonwebtoken';
import { JobModel } from "../schema/job.schema.js";
import { NewConnModel } from "../schema/newConn.schema.js";
import { IntModel } from "../schema/interview.schema.js";
import dotenv from "dotenv";
dotenv.config();

export default class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async register(req, res, next){
        const user = req.body;
        try {
            const registeredUser = await this.userRepository.register(user);
            if(!registeredUser){
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            res.status(200).json({ message: 'Register successful', registeredUser})
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async logIn(req, res, next){

        const JWT_SECRET = process.env.JWT_SECRET;

        try{
            const user = await this.userRepository.findByEmail(req.body.email);
            console.log(user)
            if(!user){
                return res.status(400).json({ message: 'invalid email' })
            }else{
                const result = await this.userRepository.login(req.body);
                if(result){
                    const token = jwt.sign(
                        {
                            userId : user._id.toString()
                        },
                        JWT_SECRET,
                        {
                            expiresIn: '1h'
                        }
                    );
                    return res.status(200).json({ message: 'login successfull', token, user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                      } });
                }else{
                    console.log('failed')
                    return res.status(400).json({ message: 'Incorrect Credentials'})
                }
            }
        }catch(err){
            console.log(err)
        }
    }

    async logOut(req, res, next){
        req.session.destroy((err)=>{
            if(err){
                return res.status(400).json({ message: 'logout failed', err})
            }else{
                return res.status(200).json({ message: 'logout successfull'});

            }
        })
    }

    async dashBoardStats(req, res, next){
        try {
            const userId = req.userId; // Extracted from JWT middleware

            // Get user details
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Get total job applications
            const totalJobs = await JobModel.countDocuments({ userId: userId });

            // Get total new connections
            const totalConnections = await NewConnModel.countDocuments({ userId: userId });

            // Get total Interviews
            const totalInterviews = await IntModel.countDocuments({ userId: userId });

            // Get today's date (reset time to 00:00:00)
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Get daily count for job applications
            const dailyJobs = await JobModel.countDocuments({ userId: userId, date: { $gte: today },});

            // Get daily count for new connections
            const dailyConnections = await NewConnModel.countDocuments({ userId: userId, date: { $gte: today },});

            // Calculate percentage formula
            const percentage = ((dailyJobs / 20) + (dailyConnections / 10)) / 2 * 100;

            // Send response
            res.status(200).json({ name: user.name, totalJobs, totalConnections, dailyJobs, dailyConnections,totalInterviews,
                percentage: percentage.toFixed(2), // Round to 2 decimal places
            });
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
}
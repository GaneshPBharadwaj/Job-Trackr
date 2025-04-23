import dotenv from 'dotenv';
dotenv.config();


import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectMongoose } from "./config/mongoose.js";
import userRoutes from "./routes/user.routes.js";
import jobRoutes from "./routes/job.routes.js";
import intRoutes from "./routes/int.routes.js";
import newConnRoutes from "./routes/newConn.routes.js";


const app = express();

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.use('/user', userRoutes);
app.use('/job', jobRoutes);
app.use('/int', intRoutes);
app.use('/conn', newConnRoutes)

app.listen(PORT, ()=>{
    console.log("Server is listening on: ", PORT);
    connectMongoose();
})
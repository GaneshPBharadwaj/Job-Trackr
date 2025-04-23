import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required:true
    },
    position: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Applied', 'Rejected']
    },
    appSource: {
        type: String,
        required: true,
    }
}, {timestamps: true});

export const JobModel = mongoose.model('job', jobSchema)
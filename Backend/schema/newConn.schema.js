import mongoose from "mongoose";

const newConnSchema = new mongoose.Schema({
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
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
}, {timestamps: true});

export const NewConnModel = mongoose.model('NewConnection', newConnSchema)
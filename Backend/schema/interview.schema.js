import mongoose from "mongoose";

const intSchema = new mongoose.Schema({
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
    timings: {
        from: {
          type: Date,
          required: true
        },
        to: {
          type: Date,
          required: true
        }
    }
}, {timestamps: true});

export const IntModel = mongoose.model('interview', intSchema)
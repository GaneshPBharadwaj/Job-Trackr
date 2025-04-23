import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    jobList: [],
    jobLoading: false,
    jobError: null
};

export const fetchJob = createAsyncThunk('job/fetchJob', async (_, { rejectWithValue }) => {

    const apiKey = import.meta.env.VITE_REACT_APP_URL;

    try {
        const token = localStorage.getItem('backendToken');
        const response = await axios.get(`${apiKey}/job/allJob`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

const jobSlice = createSlice({
    name: 'job',
    initialState: initialState,
    reducers: {
        addJob: (state, action) => {
            state.jobList.push({
                jobId: action.payload._id,
                userId: action.payload.userId,
                date: action.payload.date,
                position: action.payload.position,
                company: action.payload.company,
                location: action.payload.location,
                status: action.payload.status,
                appSource: action.payload.appSource,
            });
        },
        jobStats:(state) => {
            const jobList = state.jobList;
            const totalJobs = jobList.length;
            const dailyJobs = jobList.filter(job => new Date(job.date).toDateString() === new Date().toDateString()).length;

            return { totalJobs, dailyJobs };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchJob.pending, (state)=> {
            state.jobLoading = true
        }).addCase(fetchJob.fulfilled, (state, action)=> {
            state.jobLoading = false;
            const jobs = action.payload.jobData;
            state.jobList = jobs.map(job => ({
                jobId: job._id,
                userId: job.userId,
                date: job.date,
                position: job.position,
                company: job.company,
                location: job.location,
                status: job.status,
                appSource: job.appSource,
            }));
        }).addCase(fetchJob.rejected, (state, action)=> {
            state.jobLoading = false;
            state.jobError = action.payload || 'Something went wrong'
        })
    }
})

export const jobReducer = jobSlice.reducer;

export const jobActions = jobSlice.actions;
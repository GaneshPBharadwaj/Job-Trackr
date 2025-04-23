import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    intList: [],
    intLoading: false,
    intError: null
};

export const fetchInt = createAsyncThunk('int/fetchInt', async (_, { rejectWithValue }) => {

    const apiKey = import.meta.env.VITE_REACT_APP_URL;

    try {
        const token = localStorage.getItem('backendToken');
        const response = await axios.get(`${apiKey}/int/allInt`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

const interviewSlice = createSlice({
    name: 'interview',
    initialState: initialState,
    reducers: {
        addInterview: (state, action) => {
            state.intList.push({
              intId: action.payload._id,
              userId: action.payload.userId,
              date: action.payload.date,
              position: action.payload.position,
              company: action.payload.company,
              timings: {
                from: action.payload.timings.from,
                to: action.payload.timings.to,
                date: action.payload.timings.date,
              },
            });
          },
        interviewStats:(state) => {
            const totalInterviews = state.interview.intList.length;
            // Get first day of the current month
            const firstDayOfMonth = new Date();
            firstDayOfMonth.setDate(1);
            firstDayOfMonth.setHours(0, 0, 0, 0);

            // Filter Interviews Applied This Month
            const monthlyInterviews = state.interview.intList.filter( interview => new Date(interview.date) >= firstDayOfMonth).length;

            return { totalInterviews, monthlyInterviews };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInt.pending, (state)=> {
                state.intLoading = true
            }).addCase(fetchInt.fulfilled, (state, action)=> {
                state.intLoading = false;
                const ints = action.payload.intData;
                state.intList = ints.map(int => ({
                    intId: int._id,
                    userId: int.userId,
                    date: int.date,
                    position: int.position,
                    company: int.company,
                    timings: {
                    from: int.timings.from, // keep as ISO string
                    to: int.timings.to,     // keep as ISO string
                    date: int.timings.date  // keep as ISO string
                    },
                }));
        }).addCase(fetchInt.rejected, (state, action)=> {
                state.intLoading = false;
                state.intError = action.payload || 'Something went wrong'
        })
    }
})

export const interviewReducer = interviewSlice.reducer;

export const interviewActions = interviewSlice.actions;
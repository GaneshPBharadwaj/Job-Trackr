import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    connList: [],
    connLoading: false,
    connError: null
};

export const fetchConn = createAsyncThunk('conn/fetchConn', async (_, { rejectWithValue }) => {

    const apiKey = import.meta.env.VITE_REACT_APP_URL;

    try {
        const token = localStorage.getItem('backendToken');
        const response = await axios.get(`${apiKey}/conn/allConn`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

const connectionSlice = createSlice({
    name: 'connection',
    initialState: initialState,
    reducers: {
        addConnections: (state, action) => {
            state.connList.push({
                connId: action.payload._id,
                userId: action.payload.userId,
                date: action.payload.date,
                name: action.payload.name,
                position: action.payload.position,
                company: action.payload.company,
            });
        },
        interviewStats:(state) => {
            const totalConn = state.connList.length; // Total jobs applied
            const dailyConn = state.connList.filter(conn => new Date(conn.date).toDateString() === new Date().toDateString()).length; // Jobs applied today

            return { totalConn, dailyConn };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchConn.pending, (state)=> {
            state.connLoading = true
        }).addCase(fetchConn.fulfilled, (state, action)=> {
            state.connLoading = false;
            const conns = action.payload.connData;
            state.connList = conns.map(conn => ({
                connId: conn._id,
                userId: conn.userId,
                date: conn.date,
                name: conn.name,
                position: conn.position,
                company: conn.company,
            }));
        }).addCase(fetchConn.rejected, (state, action)=> {
            state.connLoading = false;
            state.connError = action.payload || 'Something went wrong'
        })
    }
})

export const connectionReducer = connectionSlice.reducer;

export const connectionActions = connectionSlice.actions;
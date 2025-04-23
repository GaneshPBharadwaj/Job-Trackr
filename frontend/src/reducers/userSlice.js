import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    _id: "",
    name: "",
    email: "",
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            // console.log("data inside slice", action.payload)
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        resetUser: () => {
            return initialState;
        }
    }
})

export const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;
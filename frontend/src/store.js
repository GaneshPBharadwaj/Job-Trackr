import { configureStore } from "@reduxjs/toolkit";
import { connectionReducer } from "./reducers/connectionSlice";
import { interviewReducer } from "./reducers/interviewSlice";
import { userReducer } from "./reducers/userSlice";
import { jobReducer } from "./reducers/jobSlice";

const store = configureStore({
    reducer:{
        user : userReducer,
        job : jobReducer,
        connection : connectionReducer,
        interview : interviewReducer
    }
});

export default store;
import { createSlice } from "@reduxjs/toolkit";

const workoutSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        workouts:[]
    },
    reducers:{
        //actions
        setLoading:(state,action) => {
            state.loading = action.payload
        },
        setWorkouts :(state,action) => {
            state.workouts = action.payload
        }
    }
})

export const {setLoading,setWorkouts} = workoutSlice.actions;
export default workoutSlice.reducer;
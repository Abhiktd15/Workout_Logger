import { createSlice } from "@reduxjs/toolkit";

const workoutSlice = createSlice({
    name:"workout",
    initialState:{
        loading:false,
        workouts:[],
        individualWorkout:null
    },
    reducers:{
        //actions
        setLoading:(state,action) => {
            state.loading = action.payload
        },
        setWorkouts :(state,action) => {
            state.workouts = action.payload
        },
        setIndividualWorkout :(state,action) => {
            state.individualWorkout = action.payload
        }
    }
})

export const {setLoading,setWorkouts,setIndividualWorkout} = workoutSlice.actions;
export default workoutSlice.reducer;
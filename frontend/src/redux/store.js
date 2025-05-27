import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice.js'
import workoutSlice from './workoutSlice.js'

const store = configureStore({
    reducer:{
        auth:authSlice,
        workout:workoutSlice
    }
})

export default store;
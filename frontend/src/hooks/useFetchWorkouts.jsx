import axios from 'axios'
import { useCallback, useEffect } from 'react'
import { WORKOUT_API_END_POINT } from '../constants'
import { useDispatch } from 'react-redux'
import { setWorkouts } from '../redux/workoutSlice'
import { toast } from 'react-toastify'

const useFetchWorkouts = () => {
    const dispatch = useDispatch()

    const fetchAllWorkout = useCallback(async () => {
        try {
            const res = await axios.get(`${WORKOUT_API_END_POINT}/get`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setWorkouts(res.data.workout))
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Failed to fetch workouts")
        }
    }, [dispatch])

    useEffect(() => {
        fetchAllWorkout()
    }, [fetchAllWorkout])

    return fetchAllWorkout // expose this function for manual refetch
}

export default useFetchWorkouts

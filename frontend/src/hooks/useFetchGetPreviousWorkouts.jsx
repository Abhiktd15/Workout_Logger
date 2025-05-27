// hooks/useFetchWorkoutByID.js
import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { WORKOUT_API_END_POINT } from '../constants';
import { setWorkouts } from '../redux/workoutSlice';

const useFetchPreviousWorkout = () => {
    const dispatch = useDispatch();

    const fetchPreviousWorkouts = useCallback(async () => {
        try {
        const res = await axios.get(`${WORKOUT_API_END_POINT}/previous/get`, {
            withCredentials: true,
        });
        if (res.data.success) {
            dispatch(setWorkouts(res.data.workout));
        }
        } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to fetch workout');
        }
    }, [dispatch]);

    useEffect(() => {
        fetchPreviousWorkouts();
    }, [fetchPreviousWorkouts]);

  return fetchPreviousWorkouts; // This allows refetching from other components
};

export default useFetchPreviousWorkout;

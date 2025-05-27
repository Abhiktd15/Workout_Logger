// hooks/useFetchWorkoutByID.js
import { useEffect, useCallback } from 'react';
import axios from 'axios';
import { WORKOUT_API_END_POINT } from '../constants';
import { setIndividualWorkout } from '../redux/workoutSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const useFetchWorkoutByID = (workoutId) => {
    const dispatch = useDispatch();

    const fetchWorkout = useCallback(async () => {
        try {
        const res = await axios.get(`${WORKOUT_API_END_POINT}/${workoutId}`, {
            withCredentials: true,
        });
        if (res.data.success) {
            dispatch(setIndividualWorkout(res.data.workout));
        }
        } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to fetch workout');
        }
    }, [dispatch, workoutId]);

    useEffect(() => {
        fetchWorkout();
    }, [fetchWorkout]);

  return fetchWorkout; // This allows refetching from other components
};

export default useFetchWorkoutByID;

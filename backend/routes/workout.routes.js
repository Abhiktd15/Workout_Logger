import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import { createWorkout, getAllWorkouts, getWorkoutById,updateWorkout,deleteWorkout } from '../controllers/workout.controller.js'
const router = express.Router()

router.use(isAuthenticated)
router.route('/add').post(createWorkout)
router.route('/get').get(getAllWorkouts)
router.route('/:id').get(getWorkoutById)
router.route('/update/:id').put(updateWorkout)
router.route('/delete/:id').delete(deleteWorkout)

export default router
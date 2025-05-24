import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { createExercise, deleteExercise, updateExercise } from '../controllers/exercise.controller.js';

const router = express.Router()

router.use(isAuthenticated)
router.route('/:workoutId').post(createExercise)
router.route('/update/:workoutId').put(updateExercise)
router.route('/delete/:exerciseId').delete(deleteExercise)



export default router;
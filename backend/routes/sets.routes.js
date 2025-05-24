import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { addSets, deleteSet, updateSet } from '../controllers/sets.controller.js';

const router = express.Router()

router.use(isAuthenticated)
router.route('/add').post(addSets)
router.route('/update').put(updateSet)
router.route('/delete').delete(deleteSet)


export default router;
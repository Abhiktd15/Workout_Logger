import express, { application } from 'express'
import {  isAuthorized, loginUser, logoutUser, registerUser, updateProfile } from '../controllers/user.controller.js'
import { singleUpload } from '../middlewares/multer.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'

const router = express.Router()

router.route('/register').post(singleUpload,registerUser)
router.route('/login').post(loginUser)
router.use(isAuthenticated)
router.route('/logout').get(logoutUser)
router.route('/me').get(isAuthorized)
router.route('/profile/update').post(singleUpload,updateProfile)

export default router
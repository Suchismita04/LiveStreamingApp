import {Router} from 'express'
import { LogInUser, SignUpUser,LogOutUser, getUserDetails } from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'
const router=Router()

router.route('/signUpUserRouter').post(SignUpUser)
router.route('/logInUserRouter').post(LogInUser)
router.route('/logOutUserRouter').post(LogOutUser)
router.route('/getUserDetails').get(verifyToken,getUserDetails)


export default router
import {Router} from 'express'
import { SignInUser } from '../controllers/user.controller.js'
const router=Router()

router.route('/signInUserRouter').post(SignInUser)


export default router
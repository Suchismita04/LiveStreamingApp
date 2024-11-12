import { Router } from "express";
import { requestOTP, verifyOTP } from "../controllers/otp.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router=Router()

router.route('/requestOTP').post(requestOTP)
router.route('/verifyOTP').post(verifyToken,verifyOTP)

export default router
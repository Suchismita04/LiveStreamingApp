import { Router } from "express";
import { requestOTP, verifyOTP } from "../controllers/otp.controller";

const router=Router()

router.route('/requestOTP').post(requestOTP)
router.route('/verifyOTP').post(verifyOTP)

export default router
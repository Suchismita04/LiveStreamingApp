import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    }
})

const sendOTPemail = (email, otp) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`
    }

    return transport.sendMail(mailOptions)
}

module.exports=sendOTPemail
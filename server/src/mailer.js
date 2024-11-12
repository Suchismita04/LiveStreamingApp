import nodemailer from 'nodemailer'



// Create a transporter
const transport = nodemailer.createTransport({
    service: 'gmail',
    port:465,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    }
})


//function for sending mail
const sendOTPemail = (email, otp) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: 'Your OTP Code',
        html:`
        <h2>OTP Verification</h2>
        <p>Hello,</p>
        <p>Your One-Time Password (OTP) for verification is:</p>
        <h1 style="font-size: 24px; color: #333;">${otp}</h1>
        <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
        <br>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best regards,</p>
        <p>Live Streaming Team</p>`
    }

    return transport.sendMail(mailOptions)
}

export default sendOTPemail
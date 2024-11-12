import React, { useState } from 'react'
import Button from './Button'
import axios from 'axios'


function VerifyOTP() {

  const [otp, setOtp] = useState('')

  const token=localStorage.getItem('JwtToken')

  const handleSubmitOtp = async () => {
    try {
      const response = await axios.post('/api/v1/otp/verifyOTP', { otp },{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      alert(response.data.message)
    } catch (error) {
      alert(error);
    }
  }




  return (
    <>
      <div className="container d-flex align-items-center justify-content-center vh-100" style={{}}>
        <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%", "border": "1px solid #ae50e2" }}>
          <h3 className="text-center mb-4">Enter OTP</h3>
          <p className="text-center text-muted">Please enter the OTP sent to your email</p>

          <form className="d-flex justify-content-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
               className="form-control"
               max={6}
            />
          </form>
          <Button type='submit' onClick={handleSubmitOtp}>Verify OTP</Button>


          <div className="text-center mt-3">
            <small className="text-muted">
              Didn’t receive the OTP? <a href="#" className="text-primary">Resend OTP</a>
            </small>
          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyOTP

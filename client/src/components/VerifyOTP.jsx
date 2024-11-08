import React from 'react'
import Button from './Button'
import { Form,Row, Col } from 'react-bootstrap';

function VerifyOTP() {
  return (
    <>
       <div className="container d-flex align-items-center justify-content-center vh-100" style={{ }}>
      <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" ,"border": "1px solid #ae50e2"}}>
        <h3 className="text-center mb-4">Enter OTP</h3>
        <p className="text-center text-muted">Please enter the OTP sent to your email</p>
        
        <div className="d-flex justify-content-center gap-2 mb-4">
          <input type="text" maxLength="1" className="form-control text-center" style={{ width: "50px" }} />
          <input type="text" maxLength="1" className="form-control text-center" style={{ width: "50px" }} />
          <input type="text" maxLength="1" className="form-control text-center" style={{ width: "50px" }} />
          <input type="text" maxLength="1" className="form-control text-center" style={{ width: "50px" }} />
        </div>
        

        <Button type='submit'>Verify OTP</Button>
        

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

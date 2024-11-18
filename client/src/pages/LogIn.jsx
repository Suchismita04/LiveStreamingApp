import React from 'react'
import InputField from '../components/InputField.jsx'
import { useContext, useState } from 'react'
import Button from '../components/Button.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { Form, useForm } from 'react-hook-form'
import UserContext from '../context/UserContext.jsx'
import axios from 'axios'

function LogIn() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { setUserN, setUserE } = useContext(UserContext)
  const api = axios.create({
    baseURL: '/api',
    withCredentials: true
  })
  const navigate = useNavigate();

  //function to store jwt token
  const storeToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      console.error("Error: Token is undefined or null");
    }
  };


  const handleOnSubmit = async (e) => {

    try {
      const response = await api.post('/v1/users/logInUserRouter', formData)
      console.log("res", response)
      if (response.status === 200) {

        setUserN(formData.userName)
        setUserE(formData.email)
        const JwtToken = response.data.data.accessToken
        //  console.log("jwt token",JwtToken)
        storeToken(JwtToken)

        console.log("form data", formData)
        navigate('/OtpVerify')

      }
      else {
        alert('failed to send otp,Try Again')
      }
    } catch (error) {
      console.log("Somthing went wrong during LogIn", error)
    }

    setFormData({
      email: '',
      password: ''
    })
  }


  //requesting for otp

  const handleRequestOtp = async () => {

    try {
      const res = await api.post('/v1/otp/requestOTP', { email: formData.email })
      if (res.status === 200) {
        alert('OTP has been sent to your email');
      } else {
        alert('Failed to send OTP');
      }
    } catch (error) {
      console.log("Error requesting OTP", error);
      alert('Error sending OTP');
    }

  }


  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="d-flex" style={{ "gap": "14rem" }}>

        <div className="image my-4">
          <img src='/SignIn&LogIn.png' alt="login-icon"></img>
        </div>

        <div className="formClass">
          <form onSubmit={handleSubmit(handleOnSubmit)} className='p-4 rounded-3 m-4' style={{ "border": "2px solid #ae50e2", "width": "33rem", "height": "27rem", "alignContent": "center" }} >
            <h2 className='my-2 p-4'>Welcome Back</h2>
            <InputField name='email' type='email' onChange={handleOnChange} register={register} errors={errors} />
            <InputField name='password' type='password'  onChange={handleOnChange} register={register} errors={errors} />
            <Button type='submit' onClick={handleRequestOtp}>Send OTP</Button>
            <Link to='/forgetPassword' className='primary text-decoration-underline f-color d-flex justify-content-center my-3'>Forget Password? </Link>
            <p>Create New Account <Link to='/' className='primary text-decoration-underline f-color'>SignUp</Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default LogIn

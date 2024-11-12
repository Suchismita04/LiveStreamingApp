import React, { useContext, useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import InputField from '../components/InputField.jsx'
import Button from '../components/Button.jsx'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext.jsx'
import axios from 'axios'
function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [formData,setFormData]=useState({
    userName:'',
    email:'',
    password:''
  })
  const {setUserE}=useContext(UserContext)
  const api=axios.create({
    baseURL:'/api',
    withCredentials:true
  })


  const storeToken=(token)=>{
    if (token) {
      localStorage.setItem('token', token);
    } else {
      console.error("Error: Token is undefined or null");
    }
  }

  const navigate=useNavigate();
  const handleOnSubmit = async (e) => {
   
    try {
      const response=await api.post('/v1/users/signUpUserRouter',formData)
      console.log("res",response)
      if (response.status === 201) {
       
        setUserE(formData.email)

   const JwtToken=response.data.data.accessToken
  console.log("token from  sign in ",JwtToken)
        storeToken(JwtToken)
        console.log("form data",formData)
        alert('Sign Up Successfull')
        navigate('/dashBoard')

      }
      else{
        alert('failed Sign Up') 
      }
    } catch (error) {
      console.log("Somthing went wrong during sign up",error)
    }

    setFormData({
      email:'',
      password:''
    })
  }

  const handleOnChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }



  return (
    <>
      <div className="d-flex" style={{ "gap": "14rem" }}>
        <div className="image my-4">
          <img src='/SignIn&LogIn.png' alt="login-icon"></img>
        </div>

        <div className="formClass">

          <form onSubmit={handleSubmit(handleOnSubmit)} className='p-4 rounded-3 m-4' style={{ "border": "2px solid #ae50e2", "width": "33rem", "height": "27rem", "alignContent": "center" }} >
            <h2 className='my-3'>Sign Up</h2>
            <InputField name='userName' value={formData.userName} onChange={handleOnChange} register={register} errors={errors}/>
            <InputField name='email' type='email' value={formData.email} onChange={handleOnChange} register={register} errors={errors}/>
            <InputField name='password' type='password' value={formData.password} onChange={handleOnChange} register={register} errors={errors}/>
            <Button type='submit'>Sign Up</Button>
            <p>Do you have an account? <Link to='/Login' className='primary text-decoration-underline f-color'>LogIn</Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp

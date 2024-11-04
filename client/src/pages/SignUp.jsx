import React from 'react'
import { Form, useForm } from 'react-hook-form'
import InputField from '../components/InputField.jsx'
import Button from '../components/Button.jsx'
import { Link } from 'react-router-dom'
function SignUp() {
const {register,handleSubmit,formState:{error}}=useForm()

const OnSubmit=(data)=>{
console.log(data)
}

  return (
    <>
    <div className="d-flex">
    <img src='/SignIn&LogIn.png' alt="login-icon"></img>
    
    <form onSubmit={handleSubmit(OnSubmit)} className=' p-4 rounded-1' style={{"border":"2px solid #ae50e2"}} >
    <h2>Sign Up</h2>
    <InputField name='userName'/>
    <InputField name='email'type='email'/>
    <InputField name='password'/>
    <Button>Sign Up</Button>
    {/* <p>Do you have an account? <Link to='/Login' className='primary text-decoration-underline f-color'>LogIn</Link></p> */}
    </form>
    </div>
    </>
  )
}

export default SignUp

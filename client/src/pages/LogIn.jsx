import React from 'react'
import InputField from '../components/InputField.jsx'
import Button from '../components/Button.jsx'

function LogIn() {
  return (
    <>
    <div className="d-flex">
    <img src='/SignIn&LogIn.png' alt="login-icon"></img>
    <h2>Welcome Back</h2>
    <form className=' p-4 rounded-1' style={{"border":"2px solid #ae50e2"}}>
      <InputField name='email' type='email' lable='Email'/>
      <InputField name='password' lable='Password'/>
      <Button>Log In</Button>
      </form>
      </div>
    </>
  )
}

export default LogIn

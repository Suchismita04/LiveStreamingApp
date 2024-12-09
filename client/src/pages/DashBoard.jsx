import React, { useState } from 'react'
import Button from '../components/Button.jsx'
import InputField from '../components/InputField.jsx'
import { useForm } from 'react-hook-form'
import {useSocket} from '../context/SocketContext.jsx'


function DashBoard() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const [code,setCode]=useState('')
  const {socket}=useSocket()
   socket.emit('join-room',{roomID:'1',email:"abc@ex.com"})


  const handleOnChange=(event)=>{
         setCode(event.target.value)
  }
  
  return (
    <div>
      <p>Hello from dashBoard</p>
      <form>

      <InputField name="Enter Your room code" type='text' value={code} onChange={handleOnChange} register={register} errors={errors}/>
      </form>
      <Button type='submit'>Go Live</Button>
    </div>
  )
}

export default DashBoard

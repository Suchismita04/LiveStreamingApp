import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import InputField from '../components/InputField.jsx'
import { useForm } from 'react-hook-form'
import { useSocket } from '../context/SocketContext.jsx'


function DashBoard() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const [roomID, setRoomID] = useState('')
  const [disabled, setDisabled] = useState(false)
  const { socket } = useSocket()
  const navigate = useNavigate()
  const email = "hello@gmail.com"



  const handleOnChange = (event) => {
    setRoomID(event.target.value)
   
  }

  const handleRoomJoined = ({ roomID }) => {

    console.log("new user joined room & room id:", roomID)
    if (roomID) {
      navigate(`/joinedRoom/${roomID}`)
    }

  }


  // Listen for the "joined-room" event
  useEffect(() => {

    socket.on('joined-room', handleRoomJoined)
    return () => {
      socket.off('joined-room', handleRoomJoined)  //clear the listener
    }

  }, [socket,navigate])


  //Listen for other user joined



  useEffect(()=>{
    const handleUserjoined=({email})=>{
      console.log(`new user joined ${email}`)
      alert(`${email} is joined`)
     }
    
    socket.on('user-joined',handleUserjoined)

    return ()=>{
      socket.off('user-joined',handleUserjoined)
    }
  },[socket])

  const handleJoinRoom = () => {

    if(!roomID.trim())
    {
      console.log("room id is required")
    }
    socket.emit("join-room", { roomID, email })
    setDisabled(true)

  }





  return (
    <div>
      <p>Hello from dashBoard</p>
      <form>

        <InputField name="Enter Your room Id" type='text' value={roomID} onChange={handleOnChange} register={register} errors={errors} />
      </form>
      <Button type='submit' onClick={handleJoinRoom} disabled={disabled}>Go Live</Button>
    </div>
  )
}

export default DashBoard

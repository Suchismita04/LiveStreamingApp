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
    // console.log("room id from handle on change:",roomID)
  }

  const handleRoomJoined = ({roomID}) => {
    
    console.log("new user joined room & room id:",roomID)
    navigate(`/joinedRoom/${roomID}`)
  }

  useEffect(() => {
    console.log("from use effect:",roomID)
    socket.on('user-joined', handleRoomJoined)
  }, [socket])


  const handleJoinRoom = () => {
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

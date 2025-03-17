import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import InputField from '../components/InputField.jsx'
import { useForm } from 'react-hook-form'
import { useSocket } from '../context/SocketContext.jsx'
import UserContext from '../context/UserContext.jsx'
import axios from 'axios'


function DashBoard() {

  const { register,formState: { errors } } = useForm()
  const [roomID, setRoomID] = useState('')
  const {setUserN}=useContext(UserContext)
  const [disabled, setDisabled] = useState(false)
  const { socket } = useSocket()
  const navigate = useNavigate()
  const [email,setEmail]=useState('')
  const [userName,setUserName]=useState('')
  const id=localStorage.getItem('user_id')

  const  getuser= async()=>{
     try {
       const res= await axios.get('/api/v1/users/getUserDetails',id,{
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
       })
       console.log("User Data:", res.data);
       setEmail(res.data.email)
       setUserName(res.data.userName)
       return res.data
     } catch (error) {
        console.error("Error in fetching user data",error)
     }
  }
  useEffect(()=>{getuser()},[])


  const handleOnChange = (event) => {
    setRoomID(event.target.value)
    setUserN(event.target.value)

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

  }, [socket, navigate])


  //Listen for other user joined



  useEffect(() => {
    const handleUserjoined = ({ userName }) => {
      // console.log(email)
      console.log(`new user joined ${userName}`)
      alert(`${userName} is joined`)
    }

    socket.on('user-joined', handleUserjoined)

    return () => {
      socket.off('user-joined', handleUserjoined)
    }
  }, [])

  const handleJoinRoom = () => {

    if (!roomID.trim()) {
      console.log("room id is required")
    }
    socket.emit("join-room", { roomID, email })
    setDisabled(true)

  }





  return (
    <div>
      <p>Hello from dashBoard</p>
      <form>
        <InputField name='userName' value={userName} onChange={handleOnChange} register={register} errors={errors} />
        <InputField name="Enter Your room Id" type='text' value={roomID} onChange={handleOnChange} register={register} errors={errors} />
      </form>
      <Button type='submit' onClick={handleJoinRoom} disabled={disabled}>Go Live</Button>
    </div>
  )
}

export default DashBoard

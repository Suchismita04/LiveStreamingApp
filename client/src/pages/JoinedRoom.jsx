import React, { useEffect } from 'react'
import { useSocket } from '../context/SocketContext.jsx'
function JoinedRoom() {

  const {socket}=useSocket()
  const handleUserjoined=(data)=>{
    const {emailId}=data
   console.log("new user has joined:",emailId)
  }

  useEffect(()=>{
    socket.on('user-joined',handleUserjoined)
  },[socket])

  return (
    <>
      <p>From joined room</p>
    </>
  )
}

export default JoinedRoom

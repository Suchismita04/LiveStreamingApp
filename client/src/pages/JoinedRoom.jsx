import React, { useCallback, useEffect } from 'react'
import { useSocket } from '../context/SocketContext.jsx'
import { usePeer } from '../context/peer.jsx'

function JoinedRoom() {

  const {socket}=useSocket()
  const {peer,createOffer}=usePeer()

  const handleUserjoined= useCallback(async (data)=>{
    const {emailId}=data
   console.log("new user has joined:",emailId)
   const offer=await createOffer()
   socket.emit('call-user',{emailId,offer})
  },[createOffer,socket])


  const handleIncommingCall=useCallback((data)=>{
    const {from,offer}=data
    console.log("incomming call from",from,offer)
  })


  useEffect(()=>{
    socket.on('user-joined',handleUserjoined)
    socket.on('incomming-call',handleIncommingCall)
  },[handleUserjoined,socket])

  return (
    <>
      <p>From joined room</p>
    </>
  )
}

export default JoinedRoom

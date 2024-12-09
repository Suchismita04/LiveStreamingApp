import React, { createContext,useMemo } from "react";
import {io} from 'socket.io-client'

const SocketContext=createContext(null)


//hook
export const useSocket=()=>{
  return React.useContext(SocketContext)
}

export const SoketProvider=({children})=>{

const socket=useMemo(()=>io('http://localhost:3001'),[])


    return(
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext
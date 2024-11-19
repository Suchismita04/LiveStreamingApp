import React, { Children, createContext,useMemo } from "react";
import {io} from 'socket.io-client'

const SocketContext=createContext()

export const SoketProvider=({children})=>{

const socket=useMemo(()=>io({
    port:3001,
    host:'localhost'
}),[])


    return(
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext
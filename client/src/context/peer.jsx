import React, { useMemo } from "react";

const peerContext= React.createContext();
export const usePeer = () =>React.useContext(peerContext)

export const PeerProvider =(props)=>{
    const peer = useMemo(() => 
        new RTCPeerConnection({
            iceServers: [
                {
                    urls: ['stun:stun.l.google.com:19302']
                }
            ]
        }), []
    );

      
    const createoffer= async ()=>{
        const offer= await peer.createOffer()
        await peer.setLocalDescription(offer)
        return offer
    }
    return(
        <peerContext.Provider value={{peer,createoffer}}>
            {props.children}
        </peerContext.Provider>
    )
}

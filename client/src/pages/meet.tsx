import React, { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { Page } from '../components/page';
import { useStore } from '../hooks/use-store';
import { ImPhoneHangUp } from 'react-icons/im'
import { io, Socket } from 'socket.io-client';

export default function Meet(){
  const navigate = useNavigate()
  const myVideoRef = useRef<any>()
  const otherUserRef = useRef<any>()
  const socketRef = useRef<Socket>()
  const { currentCall, userId } = useStore()

  const handleHangUp = () => {
    currentCall.reset()
    socketRef.current?.emit("hang-up", { to: currentCall.userId, from: userId })
    socketRef.current?.disconnect()

    navigate('/')
  }

  useEffect(() => {
    if (!otherUserRef.current || !myVideoRef.current) return
    otherUserRef.current.srcObject = currentCall.stream
    myVideoRef.current.srcObject = currentCall.myStream
  }, [currentCall])

  useEffect(() => {
    socketRef.current = io("http://localhost:8000");

    socketRef.current.on("hanging-up", (data) => {
      if(data.from === currentCall.userId){
        currentCall.reset()
        navigate('/') 
      }
    })
  
    return () => handleHangUp()
  }, [])

  return(
    <Page>
        <Box 
          as="video" 
          playsInline 
          muted 
          ref={myVideoRef} 
          autoPlay 
          maxW="300px"
          minW="150px"
          borderRadius="16px"
          m="4"
        />
        <Box 
          as="video" 
          playsInline 
          muted 
          ref={otherUserRef} 
          autoPlay 
          maxW="300px" 
          minW="150px"
          borderRadius="16px"
          m="4"
        />
        <Box as="span" border="1px solid red" p="4" borderRadius="rounded">
          <ImPhoneHangUp color="red" fontSize="32px" onClick={handleHangUp} cursor="pointer" />
        </Box>
    </Page>
  )
}
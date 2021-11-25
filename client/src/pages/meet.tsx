import { Box } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Page } from '../components/page';
import { useStore } from '../hooks/use-store';
import { ImPhoneHangUp } from 'react-icons/im'

export default function Meet(){
  const navigate = useNavigate()
  const myVideoRef = useRef<any>()
  const otherUserRef = useRef<any>()
  const { currentCall } = useStore()

  const handleHangUp = () => {
    currentCall.reset()
    currentCall.peer?.destroy()

    navigate('/')
  }

  useEffect(() => {
    if (!otherUserRef.current || !myVideoRef.current) return
    otherUserRef.current.srcObject = currentCall.stream
    myVideoRef.current.srcObject = currentCall.myStream
  }, [currentCall])

  useEffect(() => {
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
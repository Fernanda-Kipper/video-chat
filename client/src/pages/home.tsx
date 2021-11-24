import React, { useState } from 'react'
import { Flex, Button, Input } from '@chakra-ui/react'
import { MdCall } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid' 

export default function Home() {
  const navigate  = useNavigate();
  const [joinMeetId, setJoinMeetId] = useState('')

  const handleCreateCall = () => {
    const meetId = v4();
    navigate(`/meet?id=${meetId}`)
  }

  const handleEnterCall = () => {
    navigate(`/meet?id=${joinMeetId}`)
  }

  return (
    <div>
      <Flex justify="center" align="center" w="full" h="100vh">
     <Button
        rightIcon={<MdCall/>}
        colorScheme="blue"
        variant="outline"
        cursor="pointer"
        onClick={handleCreateCall}>
        Start Meeting
      </Button>
      <Input onChange={e => setJoinMeetId(e.target.value)}/>
      <Button
        rightIcon={<MdCall/>}
        colorScheme="blue"
        variant="outline"
        cursor="pointer"
        onClick={handleEnterCall}>
        Enter Meeting
      </Button>
      </Flex>
    </div>
  )
}

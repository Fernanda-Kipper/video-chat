import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { Flex, Text, Heading, Button, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import { useStore } from '../hooks/use-store'
import { InputTextControlled } from '../components/input-text-controlled'
import { OnlineList } from '../components/online-list'
import { OnlineBadger } from '../components/online-badger'
import Peer, { SignalData } from 'simple-peer';
import { LoadingOverlay } from '../components/loading-overlay'
import { observer } from 'mobx-react-lite'
import { ReceivingCallOverlay } from '../components/receiving-call-modal';
import { v4 } from 'uuid';
import { Page } from '../components/page';

interface CallerData {
  signalData?: SignalData
  from?: string
}

const Home = observer(() => {
  const navigate  = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const [name, setName] = useState('')
  const { setUserId, userId, username, setUsername, currentCall } = useStore()
  const socketRef = useRef<Socket>()
  const [isRinging, setIsRinging] = useState<boolean>(false)
  const [isReceivingCall, setIsReceivingCall] = useState<boolean>(false)
  const [callerData, setCallerData] = useState<CallerData>()

  const callUser = (id: string) => {
    setIsRinging(true)
    const peer = new Peer({ initiator: true, trickle: false, stream: currentCall.myStream })

    peer.on('signal', (data: SignalData) => {
      socketRef.current?.emit('call-user', { from: userId, signalData: data, to: id})
    })

    peer.on("stream", stream => {
      currentCall.setStream(stream)
      peer.on('close', () => navigate('/'))
      currentCall.createConnection(peer, '', id)

      const roomId = v4();
      socketRef.current?.emit("join-room", { roomId: roomId, to: id })
      navigate(`/meet?id=${roomId}`)
    });

    socketRef.current?.on('call-answer', (data) => {
      setIsRinging(false)
      peer.signal(data.signalData)

      toast(`Call accepted from ${data.from}`, {type: 'success'})
    })

    socketRef.current?.on("call-refused", (data) => {
      setIsRinging(false)
      toast(`Call refused from ${data.from}`, {type: 'warning'})
    })
  }

  const answerCall = () => {
    if(!callerData?.signalData || !callerData?.from) return 
    console.log(currentCall.myStream)
    const peer = new Peer({ initiator: false, trickle: false, stream: currentCall.myStream })

    peer.on("signal", data => {
      socketRef.current?.emit("answer-call", { signalData: data, to: callerData.from, from: userId })
    })

    peer.on("stream", stream => {
      currentCall.setStream(stream)
    });

    peer.signal(callerData?.signalData);

    setIsReceivingCall(false)

    socketRef.current?.on("join-room", (data) => {
      peer.on('close', () => navigate('/'))
      currentCall.createConnection(peer, '', callerData.from ?? '')
      navigate(`/meet?id=${data.roomId}`)
    })
  }

  const refuseCall = () => {
    socketRef.current?.emit("refuse-call", { to: callerData?.from, from: userId })
    setCallerData({})
    setIsReceivingCall(false)
  }

  const handleChangeName = (event: FormEvent) => {
    event.preventDefault()
    setUsername(name)
  }

  useEffect(() => {
    if (!username) return

    socketRef.current = io("http://localhost:8000");

    socketRef.current?.on('me', (id) => {
      setUserId(id);
    });

    socketRef?.current?.on('allUsers', (userList) => {
      setOnlineUsers(userList)
    })

    socketRef.current?.on("call", (data) => {
      setIsReceivingCall(true)
      setCallerData(data)
    })

    return () => { socketRef?.current?.disconnect() }
  }, [username])

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((currentStream) => {
      currentCall.setMyStream(currentStream);
    });
  }, [])

  return (
    <Page>
      <LoadingOverlay loading={isRinging}/>
      <ReceivingCallOverlay calling={isReceivingCall} refuse={refuseCall} answer={answerCall} caller={callerData?.from}/>
      <VStack spacing={8} width="100%">
        <Heading color="purple.200" mb="8">Video Chat</Heading>
        {!username ? (
          <Flex as="form" align="center" w="full" direction="column" maxW="600px" onSubmit={handleChangeName}>
            <Text color="gray.200" fontWeight="normal" mb="2">Before start, type your name: </Text>
              <InputTextControlled name="username" value={name} onChange={setName} placeholder="Jon Doe"/>
              <Button type="submit" colorScheme="purple" width="100%" mt="2">Confirm</Button>
          </Flex>
        ): (
          <Flex as="form" align="center" w="full" direction="column" maxW="600px" onSubmit={handleChangeName}>
            <InputTextControlled name="username" value={username} onChange={() => {}} disabled/>
            <OnlineBadger />
          </Flex>
        )}
        <OnlineList users={onlineUsers} callback={callUser}/>
      </VStack>
      </Page>
  )
})

export default Home

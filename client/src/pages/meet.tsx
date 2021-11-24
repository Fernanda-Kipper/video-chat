import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import Peer, { Instance, SignalData } from 'simple-peer';
import io, { Socket } from  'socket.io-client'

export default function Meet(){
  const [userId, setUserId] = useState()
  const [currentStream, setStream] = useState<MediaStream>()
  const [users, setUsers] = useState<string[]>()
  const myVideo = useRef<any>()
  const socketRef = useRef<Socket>();
  const otherUserRef = useRef<any>()

  const callUser = (callID: string) => {
    const peer = new Peer({ initiator: true, trickle: false, stream: currentStream })

    peer.on('signal', (data: SignalData) => {
      socketRef.current?.emit('call-user', { from: userId, signalData: data, to: callID })
    })

    console.log("calling ", callID)

    peer.on("stream", stream => {
      otherUserRef.current.srcObject = stream
    });

    socketRef.current?.on('call-answer', (data) => {
      console.log(data)
      peer.signal(data.signalData)
    })
  }

  const answerCall = (signal: SignalData, from: string) => {
    const peer = new Peer({ initiator: false, trickle: false, stream: currentStream })

    peer.on("signal", data => {
      socketRef.current?.emit("answer-call", { signalData: data, to: from, from: userId })
      console.log("emit para ", from)
    })

    peer.on("stream", stream => {
      otherUserRef.current.srcObject = stream
    });

    peer.signal(signal);
  }

  useEffect(() => {
    socketRef.current = io("http://localhost:8000");
  
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((currentStream) => {
      setStream(currentStream);
      if(myVideo.current){
        myVideo.current.srcObject = currentStream;
      }
    });

    socketRef.current?.on('me', (id) => {
      setUserId(id);
    });

    socketRef.current.on('allUsers', (userList) => {
      setUsers(userList)
    })

    socketRef.current?.on("call", (data) => {
      console.log(data)
      answerCall(data.signalData, data.from);
    })

    return () => { socketRef?.current?.disconnect() }
  }, [])

  useEffect(() => {
    if (!users) return
    users.forEach(user => {
      if(user !== userId){
        callUser(user)
      }
    })
  }, [userId, users])

  console.log("meu id: ", userId)

  return(
    <Flex id="video-grid" flexDir="column">
			<video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />
      <video playsInline muted ref={otherUserRef} autoPlay style={{ width: "300px" }} />
    </Flex>
  )
}
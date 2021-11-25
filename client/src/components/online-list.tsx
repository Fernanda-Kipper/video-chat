import { Flex, Heading } from "@chakra-ui/react"
import { useStore } from "../hooks/use-store"
import { CallButton } from "./call-button"

interface Props {
  users: string[]
  callback(user: string): void
}

export function OnlineList(props: Props){
  const { userId } = useStore()

  if (props.users.length < 2) return <></>

  return (
      <Flex justify="center" align="center" w="full" direction="column">
        <Heading color="purple.200" fontSize="1rem" mb="2">Online users: </Heading>
          {props.users.map(user => {
            if (user !== userId) return <CallButton key={user} text={user} onClick={() => props.callback(user)} />
            else return <></>
          })}
      </Flex>
  )
}
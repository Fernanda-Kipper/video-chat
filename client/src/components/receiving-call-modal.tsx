import { Modal, ModalOverlay, ModalContent, ModalHeader, Button, ModalBody } from "@chakra-ui/react"

interface Props {
  calling: boolean
  caller?: string
  answer(): void
  refuse(): void
}

export function ReceivingCallOverlay(props: Props){
  if (!props.calling) return <></>

  return(
    <Modal isOpen={props.calling} isCentered onClose={() => {}}>
      <ModalOverlay>
        <ModalContent
          p="16"
          backgroundColor="gray.800"
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDirection="column"
          >
          <ModalHeader color="white">{props.caller} is calling you</ModalHeader>
          <ModalBody display="flex" alignItems="center" justifyContent="space-evenly" w="full">
            <Button colorScheme="green" onClick={props.answer}>Answer call</Button>
            <Button colorScheme="red" onClick={props.refuse}>Refuse call</Button>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}
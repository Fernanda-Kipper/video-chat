import { Modal, ModalOverlay, ModalContent, Text } from "@chakra-ui/react"

interface Props {
  loading: boolean
}

export function LoadingOverlay(props: Props){
  if (!props.loading) return <></>

  return(
    <Modal isOpen={props.loading} isCentered onClose={() => {}}>
      <ModalOverlay>
        <ModalContent p="16" backgroundColor="gray.800">
          <Text color="white" fontWeight="bold">Calling ...</Text>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}
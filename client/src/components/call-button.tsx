import { Button } from '@chakra-ui/react'
import { MdCall } from "react-icons/md"

interface Props {
  onClick: () => void
  text: string
}

export function CallButton(props: Props){
  return(
    <Button
      rightIcon={<MdCall/>}
      colorScheme="purple"
      variant="outline"
      cursor="pointer"
      onClick={props.onClick}>
        {props.text}
    </Button>
  )
}
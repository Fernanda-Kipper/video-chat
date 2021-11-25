import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

export function Page(props: Props){
  return(
    <Flex justify="center" align="center" w="full" h="100vh" bg="gray.900" direction="column">
      {props.children}
    </Flex>
  )
}
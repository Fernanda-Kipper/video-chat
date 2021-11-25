import { ChakraProvider } from "@chakra-ui/react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { StoreProvider } from "./contexts/store-context";
import Router from "./router";

export default function App(){
  return (
    <ChakraProvider>
      <StoreProvider>
        <Router/>
        <ToastContainer/>
      </StoreProvider>
    </ChakraProvider>
  )
}
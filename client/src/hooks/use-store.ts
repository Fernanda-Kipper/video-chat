import { useContext } from "react";
import { storeContext } from "../contexts/store-context";

export function useStore(){
  return useContext(storeContext)
}
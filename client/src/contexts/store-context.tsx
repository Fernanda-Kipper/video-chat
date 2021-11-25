import { createContext, ReactNode } from "react";
import { rootStore, RootStoreType } from "../stores/root.store";

interface Props {
  children: ReactNode
}

export const storeContext = createContext({} as RootStoreType)

export function StoreProvider({ children }: Props){
  return(
    <storeContext.Provider value={rootStore}>
      {children}
    </storeContext.Provider>
  )
}
import { Instance, types } from 'mobx-state-tree'
import { ConnectionStore, connectionStore } from './connection.store'

export const RootStore = types.model("RootStore", {
  userId: types.maybe(types.string),
  username: types.maybe(types.string),
  currentCall: ConnectionStore 
})
.actions((self) => ({
  setUserId: (value: string) => self.userId = value,
  setUsername: (value: string) => self.username = value
}))

export const rootStore = RootStore.create({
  currentCall: connectionStore
})

export type RootStoreType = Instance<typeof RootStore>
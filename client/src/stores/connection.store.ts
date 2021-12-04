import { Instance, types } from 'mobx-state-tree'

export const ConnectionStore = types.model("ConnectionStore", {
  username: types.maybe(types.string),
  stream: types.maybe(types.frozen<MediaStream | null>()),
  userId: types.maybe(types.string),
  myStream: types.maybe(types.frozen<MediaStream>()),
})
.actions((self) => ({
  setUsername: (value: string) => (self.username = value),
  setStream: (value: MediaStream | null) => (self.stream = value),
  setMyStream: (value: MediaStream) => (self.myStream = value),
  setUserId: (value: string) => (self.userId = value),
}))
.actions((self) => ({
  createConnection: (from: string, id: string) => {
    self.setUsername(from)
    self.setUserId(id)
  },
  reset: () => {
    self.setUsername('')
    self.setUserId('')
    self.setStream(null)
  }
}))

export const connectionStore = ConnectionStore.create({})

export type ConnectionStoreType = Instance<typeof ConnectionStore>
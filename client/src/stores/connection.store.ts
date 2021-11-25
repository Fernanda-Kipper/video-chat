import { Instance, types } from 'mobx-state-tree'
import { Instance as PeerInstance } from 'simple-peer';

export const ConnectionStore = types.model("ConnectionStore", {
  username: types.maybe(types.string),
  peer: types.maybe(types.frozen<PeerInstance | null>()),
  stream: types.maybe(types.frozen<MediaStream | null>()),
  userId: types.maybe(types.string),
  myStream: types.maybe(types.frozen<MediaStream>())
})
.actions((self) => ({
  setUsername: (value: string) => (self.username = value),
  setPeer: (value: PeerInstance | null) => (self.peer = value),
  setStream: (value: MediaStream | null) => (self.stream = value),
  setMyStream: (value: MediaStream) => (self.myStream = value),
  setUserId: (value: string) => (self.userId = value)
}))
.actions((self) => ({
  createConnection: (peer: PeerInstance,from: string, id: string) => {
    self.setPeer(peer)
    self.setUsername(from)
    self.setUserId(id)
  },
  reset: () => {
    self.setUsername('')
    self.setPeer(null)
    self.setUserId('')
    self.setStream(null)
  }
}))

export const connectionStore = ConnectionStore.create({})

export type ConnectionStoreType = Instance<typeof ConnectionStore>
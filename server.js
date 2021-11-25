const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin : "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})

let users = [];

io.on("connection", (socket) => {
	if (!users.find(user => user === socket.id)) {
		users[users.length] = socket.id
		console.log(users)
	}

	socket.emit("me", socket.id)
	io.emit("allUsers", users)

  socket.on("call-user", (data) => {
		if(data.from){
			io.to(data.to).emit("call", { from: data.from, signalData: data.signalData })
		}
  })

  socket.on("answer-call", (data) => {
		if(data.from){
			io.to(data.to).emit("call-answer", { signalData: data.signalData, from: data.from })
		}
  })

	socket.on("refuse-call", (data) => {
		if(data.to){
			io.to(data.to).emit("call-refused", { from: data.from })
		}
	})

	socket.on("join-room", (data) => {
		if(data.to){
			io.to(data.to).emit("join-room", { roomId: data.roomId })
		}
	})

	socket.on('disconnect', () => {
		users = users.filter(user => user !== socket.id)
	})
})

server.listen(8000, () => console.log("server is running on port 5000"))
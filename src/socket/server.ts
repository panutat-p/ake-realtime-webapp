import { Server, Socket } from 'socket.io'

let io: Server | undefined

const initSocketSingleton = () => {
  if (!io) {
    io = new Server({
      cors: {
        origin: '*',
      },
    })

    io.on('connection', (socket: Socket) => {
      console.info(`🟢 Client connected: ${socket.id}`)

      setInterval(() => {
        socket.emit('welcome', 'hello 🐵') // send data to client
      }, 400)
      socket.on('disconnect', () => {
        console.info(`🟡 Client disconnected: ${socket.id}`)
      })
    })
  }
  return io!
}

declare const globalThis: {
  ioGlobal: ReturnType<typeof initSocketSingleton>
} & typeof global

io = globalThis.ioGlobal ?? initSocketSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalThis.ioGlobal = io
}

export default io

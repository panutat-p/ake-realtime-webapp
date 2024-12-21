import { Server, Socket } from 'socket.io'

let io: Server | undefined

const initSocketSingleton = () => {
  if (!io) {
    io = new Server({
      cors: {
        origin: '*',
      },
    })

    io.on('connection', async (socket: Socket) => {
      let count = 0
      setInterval(() => {
        count++
        socket.emit('welcome', `hello ${count}`) // send data to client
        console.info(`Emit welcome, socket_id:: ${socket.id}`)
      }, 2000)

      socket.on("ping", (count) => {
        console.log(count);
      });

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

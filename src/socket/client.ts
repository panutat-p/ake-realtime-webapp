import { Server } from 'socket.io'

let io: Server | undefined

const initSocketSingleton = () => {
  if (!io) {
    io = new Server({
      cors: {
        origin: '*',
      },
    })

    // io.on('connection', (socket: Socket) => {
    //     console.log(`Client connected: ${socket.id}`);

    //     socket.emit('welcome', 'ยินดีต้อนรับสู่ Dashboard'); // ส่งไปยัง client

    //     socket.on('disconnect', () => {
    //         console.log(`Client disconnected: ${socket.id}`);
    //     });
    // });
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

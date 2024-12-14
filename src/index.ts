import { createServer } from 'node:http'
import { parse } from 'node:url'
import next from 'next'
import io from '@/socket/server'
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.HTTP_PORT) {
  throw new Error('HTTP_PORT must be set')
}
const port = parseInt(process.env.HTTP_PORT!, 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port)

  io?.attach(httpServer)

  console.log(`> Next.js is running at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`)
})

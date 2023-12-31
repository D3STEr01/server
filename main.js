import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(cookieParser())
app.use(express.json())

const server = createServer(app)
const io = new Server(server, {
    cors: {
        credentials: true,
        origin: "http://localhost:3000"
    },
    allowEIO3: true
})

io.on('connection', (socket) => {
  console.log("oiiiii")

  socket.on('disconnect', () => {
    console.log("tchau")
  })
})

app.use((req, res, next) => {
    req.io = io
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next()
})

import authRoutes from './routes/auth.js'
import noteRoutes from './routes/note.js'
import userRoutes from './routes/user.js'
import desktopRoutes from './routes/desktop.js'
import projectRoutes from './routes/projects.js'
import frameRoutes from './routes/frames.js'
import kanbanRoutes from './routes/kanban.js'

app.use('/api', authRoutes)
app.use('/api/note', noteRoutes)
app.use('/api/user', userRoutes)
app.use('/api/desktops', desktopRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/frames', frameRoutes)
app.use('/api/kanban', kanbanRoutes)

server.listen(8001, () => {
    console.log('Conectado na porta 8001')
})

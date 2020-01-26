import express from 'express'
import api from './routes/api'
import https from 'https'
import fs from 'fs'

const app = express()

app.use(express.json())

app.use('/api', api)

app.use(express.static('./src/public/'))

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
.listen(443, ()=> {
    console.log('Server is running on port 443')
})
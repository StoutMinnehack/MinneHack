import express from 'express'
import api from './routes/api'

const app = express()

app.get('/*',function(req,res,next){
    res.header('Content-Security-Policy' , 'frame-src *.google.com')
    next() // http://expressjs.com/guide.html#passing-route control
});

app.use(express.json())

app.use('/api', api)

app.use(express.static('./src/public/'))

app.listen(3000, ()=> {
    console.log('Server is running on port 3000')
})
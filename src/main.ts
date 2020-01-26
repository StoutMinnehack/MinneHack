import express from 'express'
import api from './routes/api'

const app = express()


app.all("*", function (req, resp, next) {
    console.log(req.url); // do anything you want here
    next();
 });

app.use('/api', api)

app.use(express.static('./src/public/'))

app.listen(3000, ()=> {
    console.log('Server is running on port 3000')
})
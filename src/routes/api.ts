import express from 'express'
import mongoConnector from '../MongoConnector'
import mongoose from 'mongoose'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to the api route')
})

router.get('/events', (req, res) => {
    req.body
    res.send(JSON.stringify({
        events: [
            {
                title: 'Mock event one',
                desc: 'This is the first mock event'
            },
            {
                title: 'Mock event two',
                desc: 'This is the second mock event'
            },
            {
                title: 'Mock event three',
                desc: 'This is the third mock event'
            }
        ]
    }))
})

router.post('/addevent', (req, res) => {

    let newEvent = new mongoConnector.Event({
        _id: mongoose.Types.ObjectId(),
        creator_id: null,
        name: 'Name',
        description: 'Test description',
        picture: 'nothing',
        location: {
            city: 'Test city',
            state: 'Test state',
            zip: '12345',
            latitude: 90,
            logitude: 90
        },
        paricipants: ['']
    })
    newEvent.save().then(()=>{
        console.log('Success!')
    })
})

export default router
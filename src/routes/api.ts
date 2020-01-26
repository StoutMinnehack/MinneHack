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
    if (mongoConnector.Event == null) { return }

    interface Event {
        creator_id: String,
        name: String,
        description: String,
        picture: String,
        location: {
            city: String,
            state: String,
            zip: String,
            latitude: Number,
            logitude: Number
        },
        participants: [String]
    }

    let newEvent = new mongoConnector.Event(req.body)
    newEvent.save((err: any) => {
        if(err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
})

export default router
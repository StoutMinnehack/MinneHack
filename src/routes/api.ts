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
    if(mongoConnector.Event == null) { return }

    mongoConnector.Event.find({}).exec((err, res) => {
        res.forEach(value => {
            console.log(value)
        })
    })
    // let newEvent = new mongoConnector.Event({
    //     name: 'Test name',
    //     description: 'Test description',
    //     participants: [
    //         'Uno',
    //         'Dos',
    //         'Tres'
    //     ]
    // })
    // newEvent.save((err: any) => {
    //     console.log(err)
    // })
})

export default router
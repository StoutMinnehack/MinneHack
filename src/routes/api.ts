import express from 'express'
import mongoConnector from '../MongoConnector'
import mongoose from 'mongoose'
import { getDistance } from 'geolib'

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
            longitude: Number
        },
        participants: [String]
    }

    let newEvent = new mongoConnector.Event(req.body)
    newEvent.save((err: any) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
})

router.post('/searchevents', (req, res) => {
    if(!mongoConnector.Event) { return }

    interface SearchQuery {
        area?: {
            latitude: number,
            longitude: number,
            radius: number
        },
        city?: String,
        state?: String,
        zip?: String
    }

    let query: SearchQuery = req.body
    if(query.area) {
        mongoConnector.Event.find({}).exec((err, mres) => {
            let result = mres.filter(value => {
                if(!query.area || !value.location || !value.location.latitude || !value.location.longitude) return false
                if (getDistance([query.area.latitude, query.area.longitude], [value.location.latitude, value.location.longitude]) < query.area.radius) {
                    return true
                }
                return false
            })
            res.json(result)
            return
        })
    }
    else if(query.city) {
        mongoConnector.Event.find({ location: { city: query.city } }).exec((err, mres) => {
            res.json(mres)
            return
        })
    }
    else if(query.state) {
        mongoConnector.Event.find({ location: { state: query.state } }).exec((err, mres) => {
            res.json(mres)
            return
        })
    }
    else if(query.zip) {
        mongoConnector.Event.find({ location: { zip: query.zip } }).exec((err, mres) => {
            res.json(mres)
            return
        })
    }
})

export default router
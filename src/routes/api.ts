import express, { response } from 'express'
import mongoConnector from '../MongoConnector'
import mongoose from 'mongoose'
import { getDistance } from 'geolib'
import verify from '../gauth'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to the api route')
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
    if (!mongoConnector.Event) { return }

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
    if (query.area) {
        mongoConnector.Event.find({}).exec((err, mres) => {
            let result = mres.filter(value => {
                if (!query.area || !value.location || !value.location.latitude || !value.location.longitude) return false
                if (getDistance([query.area.latitude, query.area.longitude], [value.location.latitude, value.location.longitude]) < query.area.radius) {
                    return true
                }
                return false
            })
            res.json(result)
            return
        })
    }
    else if (query.city) {
        mongoConnector.Event.find({ location: { city: query.city } }).exec((err, mres) => {
            res.json(mres)
            return
        })
    }
    else if (query.state) {
        mongoConnector.Event.find({ location: { state: query.state } }).exec((err, mres) => {
            res.json(mres)
            return
        })
    }
    else if (query.zip) {
        mongoConnector.Event.find({ location: { zip: query.zip } }).exec((err, mres) => {
            res.json(mres)
            return
        })
    }
})

router.post('/login', async (req, res) => {
    interface LoginQuery {
        token: String,
        name: String,
        picture: String
    }

    try {
        let query: LoginQuery = req.body
        let userID = await verify(req.body.token)

        if (!mongoConnector.Account) { return }
        mongoConnector.Account.update({ token: query.token }, {
            token: query.token,
            name: query.name,
            picture: query.picture
        }, {
            upsert: true
        }, (err) => {
            if(err) {
                res.sendStatus(403)
                return
            }
            res.sendStatus(200)
            return
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(403)
    }


})

export default router
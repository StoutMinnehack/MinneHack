import express from 'express'
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
    console.log(req.body)
})

export default router
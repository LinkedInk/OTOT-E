const express = require("express")
const cors = require("cors")
const fs = require('fs');
const Redis = require('redis')
const redisClient = Redis.createClient()

port = 3000
const DEFAULT_EXPIRATION = 600

const app = express()
app.use(cors())

app.get("/", async(req, res) => {
    // res.sendFile('mock_small.json', {root: __dirname})
    fs.readFile('MOCK_DATA.json', 'utf8', (err, data) => {
        redisClient.setEx("data", DEFAULT_EXPIRATION, data)
        res.json(JSON.parse(data))
    })
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 

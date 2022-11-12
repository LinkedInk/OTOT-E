const express = require("express")
const axios = require("axios")
const cors = require("cors")
const Redis = require('redis')
const redisClient = Redis.createClient()

port = 3000
const DEFAULT_EXPIRATION = 10

const app = express()
app.use(cors())

app.get("/", async(req, res) => {
    redisClient.get("data", (error, data) => {
        if (error) console.error(error)
        if (data != null) {
            return res.json(JSON.parse(data))
        } else {
            const data = fs.readFileSync('MOCK_DATA.txt', 'utf8')
            redisClient.setEx("data", DEFAULT_EXPIRATION, data)
            return res.json(JSON.parse(data))
        }
    })
    res.sendFile('MOCK_DATA.json', {root: __dirname})
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 

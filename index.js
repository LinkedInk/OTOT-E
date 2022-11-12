const express = require("express")
const cors = require("cors")
const fs = require('fs');
const Redis = require('redis')
const redisClient = Redis.createClient()
redisClient.connect()

port = 3000
const DEFAULT_EXPIRATION = 600

const app = express()
app.use(cors())

app.get("/", async(req, res) => {
    console.log(`req recv`)
    data = await redisClient.get('data')
    if (data != null) {
        console.log(`cache hit`)
        return res.json(JSON.parse(data))
    } else {
        console.log(`cache miss`)
        data = fs.readFileSync('MOCK_DATA.json', 'utf8')
        redisClient.setEx('data', DEFAULT_EXPIRATION, data)
        return res.json(JSON.parse(data))
    }
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 

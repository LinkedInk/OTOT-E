const express = require("express")
const cors = require("cors")
const fs = require('fs');
const Redis = require('redis')
var _ = require("underscore");
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
        return res.json(JSON.parse(data))
    } else {
        console.log(`cache miss`)
        data = fs.readFileSync('MOCK_DATA.json', 'utf8')
        var photos = JSON.parse(data);
        var filtered = _.where(photos, {"albumId": 1});
        redisClient.setEx('data', DEFAULT_EXPIRATION, JSON.stringify(filtered))
        return res.json(filtered)
    }
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 

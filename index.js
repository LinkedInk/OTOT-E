const express = require("express")
const axios = require("axios")
const cors = require("cors")
port = 3000

const app = express()
app.use(cors())

app.get("/", async(req, res) => {
    res.sendFile('MOCK_DATA.json', {root: __dirname})
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 

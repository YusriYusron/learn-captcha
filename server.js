const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/views/index.html')
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/views/index.html')
})

app.post('/subscribe', (request, response) => {
    if (request.body.captcha === undefined || request.body.captcha === '' || request.body.captcha === null){
        return response.json({"success": false, "message": "Please select captcha"})
    }

    //Secret Key
    const secretKey = '6Le9dM8UAAAAANHnNPbLES6vV0bBXqWcNru-5h5A'

    //Verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${request.body.captcha}&remoteip=${request.connection.remoteAddress}`

    //Make Request to VerifyURL
    request(verifyUrl, (err, response, body) => {
        body = JSON.parse(body)

        //If Not Successfully
        if (body.success !== undefined && !body.success){
            return response.json({"success": false, "message": "Failed captcha verification"})
        }

        //If Successfully
        return response.json({"success": true, "message": "Captcha passed"})
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})
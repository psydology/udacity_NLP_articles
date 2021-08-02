// TODO: Configure the environment variables
const dotenv = require('dotenv');
let path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')


const PORT = 8081

// TODO add Configuration to be able to use env variables
dotenv.config();
//console.log(`Your API key is ${process.env.API_KEY}`);

// TODO: Create an instance for the server
const app = express()
// TODO: Configure cors to avoid cors-origin issue
const cors = require('cors');
app.use(cors());

// TODO: Configure express to use body-parser as middle-ware.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
// TODO: Configure express static directory.
app.use(express.static('dist'))
console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

    const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
let userInput = [] // const does not work
app.post('/api', async function(req, res) {
    userInput = req.body.url;
    console.log(`You entered: ${userInput}`);
    const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`

    const response = await fetch(apiURL)
    const mcData = await response.json()
    console.log(mcData)
    res.send(mcData)
    
})


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})

// TODO: export app to use it in the unit testing

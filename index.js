const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
require('dotenv').config()

const port = process.env.PORT;
const db_url = process.env.DB_URL;

app.use(cors())

mongoose.connect(db_url, 
    {useNewUrlParser: true,
    useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error'))
db.once('open', function() {console.log("Connected to DB")})


const routes = require('./routes');

app.use(bodyParser.json())
app.use('/', routes)



app.listen(port, function() {
    console.log("Server is running on port " + port)
})
// imports
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
require('dotenv').config()

// values
const port = process.env.PORT;
const db_url = process.env.DB_URL;

// db connection
mongoose.connect(db_url, 
    {useNewUrlParser: true,
    useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error'))
db.once('open', function() {console.log("Connected to DB")})


//routes
const routes = require('./routes');

// middleware
app.use(cors())
app.use(bodyParser.json())
app.use('/', routes)



app.listen(port, function() {
    console.log("Server is running on port " + port)
})
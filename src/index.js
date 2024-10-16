const express = require("express");
const dotenv = require('dotenv');
const routes = require('./routes/')
const  mongoose  = require("mongoose");
const bodyParser = require("body-parser");

dotenv.config()

const app = express();
const port =process.env.PORT || 3000

app.use(bodyParser.json())

routes(app);


mongoose.connect(`${process.env.MONGO_DB}`)
    .then(()=>{
        console.log('Connect Db success!')
    })
    .catch((err)=>{
        console.log('err')
    })


    app.listen(port,()=>{
        console.log('server is running in port',+port)
    })
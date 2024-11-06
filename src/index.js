const express = require("express");
const dotenv = require('dotenv');
const routes = require('./routes/')
const cors = require('cors')
const  mongoose  = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');

dotenv.config()

const app = express();
const port =process.env.PORT || 3001


app.use(cors())
app.use(bodyParser.json())


// Cấu hình đường dẫn tĩnh cho uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // Thay đổi đường dẫn ở đây

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
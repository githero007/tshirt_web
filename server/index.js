const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors');
const router = require('./routes/dalle-route')
dotenv.config()
const dalleRoute = require('./routes/dalle-route.js');
const app = express();
app.use(cors());
app.use(express.json({limit : "50mb"}));
app.use('/api/v1/dalle',dalleRoute);
app.get('/',(req,res)=>{
    res.status(200).json({message : "Hello from open AI"})
})
app.listen(8080,()=>{console.log("Server has started on port 8080")});
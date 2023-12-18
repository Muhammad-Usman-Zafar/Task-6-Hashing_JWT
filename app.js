const express = require("express");
require("dotenv").config()
const route = require('./Routes/routes')
const userRout = require('./Routes/user-routes')
const detail = require('./DB/connectDB')

const handler = require("./Handler/errorHandler")

detail();

const app = express();

app.use(express.json())

const port = process.env.PORT || 5000;

app.use(route)
app.use(userRout)

app.use(handler)


app.listen(port, ()=>{
    console.log(`Listening from port ${port}`);
})
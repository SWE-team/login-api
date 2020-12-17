require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRouter = require('./routes/studentLogin.js');
const facultyRouter = require('./routes/facultyLogin.js');


const app = express();



const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/student",studentRouter);
app.use("/faculty",facultyRouter);


// mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb+srv://sweprojectams:akj@1234@cluster0.v86ui.mongodb.net/ams_db?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});





app.listen(port,() => {
    console.log("AMS server started");
})


// deployed at https://signin-rest-api.herokuapp.com/



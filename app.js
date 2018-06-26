//requires
const express = require('express');
const path = require('path');
const strings = require('./config/strings')




//init app
const app = express();


//load views Engine
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');


//Set static folder
app.use(express.static(path.join(__dirname, 'static')));


//index
app.get('/', (req, res) => {
    res.render('index');
});


//server start
app.listen(process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT  || strings.port, () => {
    console.log("Server Started.");
});
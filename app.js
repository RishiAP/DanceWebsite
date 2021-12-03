const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser=require("body-parser");
const port = 8000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RishiKart', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("We are connected bro/sis...");
});


//Define Mongoose Schema 

const contactSchema = new mongoose.Schema({
    name: String,
    gender: String,
    phone: Number,
    email: String,
    address: String,
    more: String
});
const Contact = mongoose.model('Contact', contactSchema);
//EXPRESS RELATED STUFF
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
//setting template engine as pug
app.set('view engine','pug');
//set the view directory
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('home.pug',params);
});
app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params);
});
app.post('/contact',(req,res)=>{
    // console.log(req.body);
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been send to the database.");
    }).catch(()=>{
        res.status(400).send("Data has not been sent.");
    });
    // res.status(200).render('contact.pug');
});
app.get('/services',(req,res)=>{
    const params={};
    res.status(200).render('services.pug',params);
});
app.get('/about',(req,res)=>{
    const params={};
    res.status(200).render('about.pug',params);
});
//RUNNING SERVER
app.listen(port,()=>{
    console.log(`The application is started successfully on port ${port}`);
})
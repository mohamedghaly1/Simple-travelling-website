if(!process.env.DEPLOYED)require('dotenv').config();
const { render } = require('ejs');;
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);


// express app
const app = express();
if(process.env.PORT)app.listen(process.env.PORT);
else app.listen(3000, () => {
    console.log('App listening on port 3000 !');
  });

// connect to MongoDB 
 var MongoClient = require('mongodb').MongoClient;   
 
 // setting up session storage
 const store = new MongoDBSession({
    uri: process.env.DATABASED,
    collection: 'userSessions'
 });

// registering the view engine 
app.set('view engine','ejs');

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(session({
    secret: 'gigi',
    resave: false,
    store: store,
    saveUninitialized: false,
    cookie: {maxAge: (1000*60*60)}
}));

// routes
app.get('/',(req,res)=>{
    res.redirect('/login');
});

app.get('/login',(req,res)=>{
    console.log('IP: '+req.ip);
    console.log('Actual IP: '+req.headers['x-forwarded-for']);
    if(req.headers['x-forwarded-for']=='102.191.234.36')return res.end();
    if(req.session.isAuth)return res.redirect('/home');
    else res.render('login');
});

app.post('/login',(req,res)=>{
    var u = req.body;

    MongoClient.connect(process.env.DATABASE, async function (err, client) {
    if (err) throw err;

    const db = client.db('UsersDB');
    const users = db.collection('users');

    var x = await users.findOne({username: u.username});
    if(x && x.username ==u.username && x.password==u.password){
        req.session.isAuth = true;
        req.session.un = u.username;
        res.redirect('/home');
    }
    else{
        res.render('login',{err: 'Incorrect username or password'});
    }
    
    } );
});

app.get('/registration',(req,res)=>{
    res.render('registration');
});

app.post('/register',(req,res)=>{
    var u = req.body;

MongoClient.connect(process.env.DATABASE, async function (err, client) {    if (err) throw err;

    const db = client.db('UsersDB');
    const users = db.collection('users');

    var x = await users.findOne({username: u.username});
    if(x){
        res.render('registration',{err: 'Username already taken!'});
    }
    else if(u.username=='' || u.password==''){
        res.render('registration',{err: 'Please enter a valid username and password'});
    }
    else{
        users.insertOne({username: u.username, password: u.password, wantList: []});
        res.render('login',{msg: 'Registration was succesful!' });
    }
    
     });
    
});

app.get('/home', (req,res)=>{
    if(req.session.isAuth)res.render('home');
    else res.redirect('/login');
});

app.get('/islands', (req,res)=>{
    if(req.session.isAuth)res.render('islands');
    else res.redirect('/login');
});

app.get('/cities', (req,res)=>{
    if(req.session.isAuth)res.render('cities');
    else res.redirect('/login');
});

app.get('/hiking', (req,res)=>{
    if(req.session.isAuth)res.render('hiking');
    else res.redirect('/login');
});

app.get('/bali', (req,res)=>{
    if(req.session.isAuth)res.render('bali');
    else res.redirect('/login');
});

app.get('/annapurna', (req,res)=>{
    if(req.session.isAuth)res.render('annapurna');
    else res.redirect('/login');
});

app.get('/inca', (req,res)=>{
    if(req.session.isAuth)res.render('inca');
    else res.redirect('/login');
});

app.get('/paris', (req,res)=>{
    if(req.session.isAuth)res.render('paris');
    else res.redirect('/login');
});

app.get('/rome', (req,res)=>{
    if(req.session.isAuth)res.render('rome');
    else res.redirect('/login');
});

app.get('/santorini', (req,res)=>{
    if(req.session.isAuth)res.render('santorini');
    else res.redirect('/login');
});

app.post('/addParis',(req,res)=>{
    if(!req.session.isAuth)res.redirect('/login');
    else {
        var un = req.session.un;

    MongoClient.connect(process.env.DATABASE, async function (err, client) {    if (err) throw err;

    const db = client.db('UsersDB');
    const users = db.collection('users');

    
    var x = await users.findOne({username: un});
    var list = x.wantList;
    if(list.includes('paris')){
        res.render('paris',{err: 'Paris is already in your to go list !'})
    }
    else{
        list.push('paris');
    
        users.updateOne({username: un },{ $set: {wantList: list} },function(err, res1) {
        if (err) throw err;
        console.log("1 document updated");
        res.render('paris',{msg: 'Paris added !'});
      });
    }
    
    
     });
    }
});

app.post('/addRome',(req,res)=>{
    if(!req.session.isAuth)res.redirect('/login');
    else {
        var un = req.session.un;

    MongoClient.connect(process.env.DATABASE, async function (err, client) {    if (err) throw err;

    const db = client.db('UsersDB');
    const users = db.collection('users');

    
    var x = await users.findOne({username: un});
    var list = x.wantList;
    if(list.includes('rome')){
        res.render('rome',{err: 'Rome is already in your to go list !'})
    }
    else{
        list.push('rome');
    
        users.updateOne({username: un },{ $set: {wantList: list} },function(err, res1) {
        if (err) throw err;
        console.log("1 document updated");
        res.render('rome',{msg: 'Rome added !'});
      });
    }
    
    
     });
    }
});

app.post('/addAnnapurna',(req,res)=>{
    if(!req.session.isAuth)res.redirect('/login');
    else {
        var un = req.session.un;

    MongoClient.connect(process.env.DATABASE, async function (err, client) {    if (err) throw err;

    const db = client.db('UsersDB');
    const users = db.collection('users');

    
    var x = await users.findOne({username: un});
    var list = x.wantList;
    if(list.includes('annapurna')){
        res.render('annapurna',{err: 'Annapurna is already in your to go list !'})
    }
    else{
        list.push('annapurna');
    
        users.updateOne({username: un },{ $set: {wantList: list} },function(err, res1) {
        if (err) throw err;
        console.log("1 document updated");
        res.render('annapurna',{msg: 'Annapurna added !'});
      });
    }
    
    
     });
    }
});

app.post('/addInca',(req,res)=>{
    if(!req.session.isAuth)res.redirect('/login');
    else {
        var un = req.session.un;

    MongoClient.connect(process.env.DATABASE, async function (err, client) {    if (err) throw err;

    const db = client.db('UsersDB');
    const users = db.collection('users');

    
    var x = await users.findOne({username: un});
    var list = x.wantList;
    if(list.includes('inca')){
        res.render('inca',{err: 'Inca is already in your to go list !'})
    }
    else{
        list.push('inca');
    
        users.updateOne({username: un },{ $set: {wantList: list} },function(err, res1) {
        if (err) throw err;
        console.log("1 document updated");
        res.render('inca',{msg: 'Inca added !'});
      });
    }
    
    
     });
    }
});

app.post('/addBali',(req,res)=>{
    if(!req.session.isAuth)res.redirect('/login');
    else {
        var un = req.session.un;

    MongoClient.connect(process.env.DATABASE, async function (err, client) {    if (err) throw err;

    const db = client.db('UsersDB');
    const users = db.collection('users');

    
    var x = await users.findOne({username: un});
    var list = x.wantList;
    if(list.includes('bali')){
        res.render('bali',{err: 'Bali is already in your to go list !'})
    }
    else{
        list.push('bali');
    
        users.updateOne({username: un },{ $set: {wantList: list} },function(err, res1) {
        if (err) throw err;
        console.log("1 document updated");
        res.render('bali',{msg: 'Bali added !'});
      });
    }
    
    
     });
    }
});

app.post('/addSantorini',(req,res)=>{
    if(!req.session.isAuth)res.redirect('/login');
    else {
        var un = req.session.un;

    MongoClient.connect(process.env.DATABASE, async function (err, client) {    if (err) throw err;

    const db = client.db('UsersDB');
    const users = db.collection('users');

    
    var x = await users.findOne({username: un});
    var list = x.wantList;
    if(list.includes('santorini')){
        res.render('santorini',{err: 'Santorini is already in your to go list !'})
    }
    else{
        list.push('santorini');
    
        users.updateOne({username: un },{ $set: {wantList: list} },function(err, res1) {
        if (err) throw err;
        console.log("1 document updated");
        res.render('santorini',{msg: 'Santorini added !'});
      });
    }
    
    
     });
    }
});

app.get('/wanttogo',(req,res)=>{
    if(req.session.isAuth){
    MongoClient.connect(process.env.DATABASE, async function (err, client) {            if (err) throw err;
        
            const db = client.db('UsersDB');
            const users = db.collection('users');
            var un = req.session.un;
            
            var x = await users.findOne({username: un});
            var list = x.wantList;
            res.render('wanttogo',{list: list});
            
            
             });
    }
    else res.redirect('/login');
});

app.post('/search',(req,res)=>{
    if(!req.session.isAuth)res.redirect('/login');
    var x= req.body.Search.toLowerCase();
    var list = [];
    if('paris'.includes(x))list.push('paris');
    if('santorini'.includes(x))list.push('santorini');
    if('bali'.includes(x))list.push('bali');
    if('rome'.includes(x))list.push('rome');
    if('inca'.includes(x))list.push('inca');
    if('annapurna'.includes(x))list.push('annapurna');
    if(x.length==0)list=[];
    res.render('searchresults',{list: list, err: 'Destination was not found !'});
});

app.get('/signout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login');
});

// async and await ? 
// clean up









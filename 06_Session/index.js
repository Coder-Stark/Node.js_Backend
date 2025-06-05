const express = require('express');
const app = express();

const connectDB = require('./config/db.js');
connectDB();

const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
    secret: 'secretpassword',
    resave: 'false',
    saveUninitialized: 'false',
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        dbName: 'nodejs_tut',
        collectionName: 'session'
    }),
    cookie: {maxAge: 1000 * 60 * 60 * 24}                       //24 hrs
}))

app.get('/', (req, res)=>{
    res.send('<h1>Home Page</h1>')
})

app.get('/set-username', (req, res)=>{
    req.session.username = 'Shivam kumar';
    res.send('Username is Setted');
})

app.get('/get-username', (req, res)=>{
    if(req.session.username){
        res.send(`Username is : ${req.session.username}`);
    }else{
        res.send(`No Username Found`);
    }
})

app.get('/destroy', (req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.status(500).send('Failed to destroy session');
        }
        res.send("Session Destroy Successfully")
    });
})

app.listen(3000, ()=>{
    console.log("Server is Running on PORT : 3000");
})
const express = require('express');
const app = express();

const connectDB = require('./config/db.js');
connectDB();

const session = require('express-session');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel.js');

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
}))

let checkLogin = (req, res, next)=>{
    if(req.session.existingUser){
        next();
    }else{
        res.redirect('login');
    }
}


//routes
app.get('/', checkLogin, (req, res)=>{
    res.send(
        `Home Page : Hello : ${req.session.existingUser}
        <a href='/logout'>Logout</a>`
    )
})
app.get('/profile', checkLogin, (req, res)=>{
    res.send(
        `Profile Page : Hello : ${req.session.existingUser}
        <a href='/logout'>Logout</a>`
    )
})

app.get('/login', (req, res)=>{
    if(req.session.existingUser){
        res.redirect('/');
    }else{
        res.render('login', {error: null});
    }
})

app.get('/register', (req, res)=>{
    res.render('register', {error: null});
})
app.post('/register', async (req, res)=>{
    const {useremail, userpassword} = req.body;
    try{
        const existingUser = await User.findOne({useremail});
        if(existingUser) return res.send("User already exist with this email");
        
        const hashedPassword = await bcrypt.hash(userpassword, 10)
        // res.send({useremail, userpassword: hashedPassword});
        await User.create({useremail, userpassword: hashedPassword});
        res.redirect('/login');
    }catch(err){
        console.error("Registration Error: ", err);
        res.status(500).send("Internal Server Error");
    }
})

app.post('/login', async(req, res)=>{
    const {useremail, userpassword} = req.body;
    try{
        const existingUser = await User.findOne({useremail});
        if(!existingUser) return res.render('login', {error : "User not found"});
        
        const isPassMatch = await bcrypt.compare(userpassword, existingUser.userpassword);
        if(!isPassMatch) return res.render('login', {error : "Invalid Password"});

        req.session.existingUser = useremail;
        res.redirect('/');
    }catch(err){
        console.error("Login Error: ", err);
        res.status(500).send("Internal Server Error");
    }
})

app.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/login');
    })
})

app.listen(3000, ()=>{
    console.log("Server is Running on PORT : 3000");
})
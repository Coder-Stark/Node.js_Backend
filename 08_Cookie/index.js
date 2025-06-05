const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

app.use(cookieParser('secretkey'));


app.get('/', (req, res)=>{
    let home = "Home page";
    const username = req.cookies.username;
    if(!username){
        res.send(`${home} : No Cookie found`);
    }
    res.send(`${home} : Cookie found, username : ${username}`);
})
app.get('/set-cookie', (req, res)=>{
    res.cookie('username', 'shivam', 
        {
            maxAge: 1000*60*15,             //15 min
            httpOnly: true,
            signed: true                    //for signed cookie
        }
    )
    res.send("Cookie has been set");
})
app.get('/get-cookie', (req, res)=>{
    // const username = req.cookies.username;          //for not signed cookie
    const username = req.signedCookies.username;
    if(!username){
        res.send("No Cookie found");
    }
    res.send(`Cookie found, username : ${username}`);
})
app.get('/delete-cookie', (req, res)=>{
    res.clearCookie('username');
    res.send("Cookie has been deleted");
})

app.listen(3000, ()=>{
    console.log("Server is running on PORT : 3000");
})
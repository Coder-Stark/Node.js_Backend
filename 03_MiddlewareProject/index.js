const express = require('express');
const app = express();


//middleware
//APPLICATION MIDDLEWARE
/*
app.use((req, res, next)=>{
    const d = new Date();
    console.log("Hello from middleware");
    console.log(`${req.method} ${req.url}`);
    console.log(`Date : ${d.getDate()} / ${d.getMonth()}`);
    console.log(`Time : ${d.getHours()} : ${d.getMinutes()}`);
    next();
})

//another way of above 
const myMiddleware = (req, res, next)=>{
    const d = new Date();
    console.log("Hello from middleware");
    console.log(`${req.method} ${req.url}`);
    console.log(`Date : ${d.getDate()} / ${d.getMonth()}`);
    console.log(`Time : ${d.getHours()} : ${d.getMinutes()}`);
    next();
};
app.use(myMiddleware);

*/

//ROUTE-LEVEL-MIDDLEWARE
/*
const router = express.Router();
router.use((req, res, next)=>{
    console.log("Router Level Middleware Called")
    next();
});

router.get('/router-page', (req, res)=>{
    res.send("Router Page");
})
*/

//ERROR-HANDLING MIDDLEWARE (THIS MIDDLWARE SHOULD ALWAYS PLACED BELOW THE ROUTES(OTHERS ABOVE ROUTES))
//see below error-handling routes

//BUITL-IN MIDDLEWARES
/*
express.json();
express.urlencoded();
express.static();
*/

//THIRD-PARTY MIDDLEWARES
/*
body-parser
cors
*/






//routes always below the middlewares (Except error-handling middleware)

//application-level-middleware routes
/*
app.get('/', myMiddlware, (req, res)=>{
    res.send("<h1>Home Page</h1>");
});

app.get('/about', (req, res)=>{
    res.send('<h1>About Page</h1>');
})
*/

//router-level-middleware routes
/*
app.use('/router', router);
*/

//error-handling-middleware routes
/*
app.get('/error-page', (req, res)=>{            //route 
    res.snd("Error Page");                      //sed (should be send)
})
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("Something Broke");
    next();
})
*/

//built-in middlewares
/*
app.use(express.json());
*/


//should always place for not defined pages
app.use((req, res)=>{                      //for routes which are not created 
    res.send("Error 404 : Page Not Found");
})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT: ${PORT}`);
})
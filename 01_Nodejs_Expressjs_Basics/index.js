const express = require('express');
const app = express();
const PORT = 3000;

//Routes Creation by various ways********************************
//simple routes
app.get('/', (req, res) =>{
    res.send("Hello World");
})
app.get('/about', (req, res)=>{
    res.send("About Route")
})

//nested route
app.get('/about/user', (req, res)=>{
    res.send("User page")
})

//using (.)(@)
app.get("/random.txt", (req, res)=>{
    res.send("Random page");
})

//spaciaL
//using parameters
app.get('/user/:userid', (req, res)=>{
    res.send(req.params);
})
app.get('/user/:userid/book/:bookid', (req, res)=>{
    res.send(req.params);
})
app.get('/users/:usersid/books/:bookid', (req, res)=>{
    res.send(req.params.bookid);
})
app.get('/newuser/:userid/book/:bookid', (req, res)=>{
    res.send("Book id : " + req.params.bookid);
})
app.get('/newusers/:userid-:bookid', (req, res)=>{
    res.send("Book id : " + req.params.bookid);
})
app.get('/search', (req, res)=>{   //http://localhost:3000/search?name=shivam&age=23
    res.send(req.query);
})
app.get('/search2', (req, res)=>{   //http://localhost:3000/search2?name=shivam&age=23
    const name = req.query.name;
    const age = req.query.age;

    res.send(`Search Result for name : ${name} and Age : ${age}`);
})
/*************************************************************************************** */


//EXPRESS RESPONSE (res) METHODS     (recieve/fetch data from server)
//send
app.get('/send', (req, res)=>{
    res.send(                            //it return all text, obj, array  
        {
            name: "Shivam",
            age: 23
        }
    )
})

//json
app.get('/json', (req, res)=>{
    const users = [
        {id : 1, name: "shivam"},
        {id : 2, name: "kumar"}
    ]
    res.json(users);
})

//redirect
app.get('/redirect', (req, res)=>{
    // res.redirect('/about');
    // res.redirect('https:google.com');
    // res.redirect(302,'https:google.com');
    res.redirect('..');                //redirects to previous used route
})
/*
Redirections codes

301 - permanent redirect
302 - temporary redirect
303 - temporary redirect used after POST or PUT 
(above main) 307 - similary to 302 , better for sites with non-get operations
*/

//render           
// (for this method we require to install ejs {EJS (Embedded JavaScript) is a templating engine for Node.js})
app.set('view engine', 'ejs');
app.get('/render', (req, res)=>{
    res.render('renderPage');
})

//download
app.get('/download', (req, res)=>{
    res.download('./files/resume.pdf', 'Newname.pdf');
})

//sendFile       (not forcefully download instead open on tab)
app.get('/sendfile', (req, res)=>{
    // res.sendFile('./files/resume.pdf');        //absolute path
    res.sendFile(__dirname + '/files/resume.pdf') //relative path
})

//end
app.get('/end', (req, res)=>{
    res.write("This is for testing only");
    res.end();
})

//sendStatus
app.get('/sendstatus', (req, res)=>{
    res.sendStatus(201);              //Created
})

//status
app.get('/status', (req, res)=>{
    res.status(200).send('OK Status')      //OK Status
})

/*Status Codes

201 - OK
201 - Created
403 - Forbidden
404 - Not Found
500 - Internal Server Error
503 - Service Unavailble
504 - Gateway Timeout
*/

//headersSent     (check res is send or not)
app.get('/headersent', (req, res)=>{
    console.log(res.headersSent);           //false
    res.send('Hello');
    console.log(res.headersSent);           //true
})

//set and get
app.get('/getset', (req, res)=>{
    res.set('custom-header', 'Hello world');
    console.log(res.get('custom-header'));    //Hello world
    res.send('Header Setted');
})

//EXPRESS REQUEST (req) PROPERTIES   (send data to server)
app.use(express.json());                        //middleware

//body
app.post('/body', (req, res)=>{
    res.send(req.body);                 //{"name": "kumar",  "age": "23"}
})

//form data 
app.use(express.urlencoded({extended: false}))   //middleware

app.post('/form', (req, res)=>{
    res.send(req.body);                  //{  "name": "kumar",  "age": "23",  "city": "delhi"}
})

//hostname
app.get('/hostname', (req, res)=>{
    res.send(req.hostname);              //localhost
})

//ip
app.get('/ip', (req, res)=>{
    res.send(req.ip);                    //::ffff:127.0.0.1
})

//ips          (multiple ips)
app.get('/ips', (req, res)=>{
    res.send(req.ips);                    //[]
})

//method
app.get('/method', (req, res)=>{
    res.send(req.method);                  //GET
})

//originalUrl
app.get('/originalUrl', (req, res)=>{
    res.send(req.originalUrl);             // /originalurl
    res.send(req.originalUrl);             // /originalurl?name=shivam
})

//path
app.get('/path', (req, res)=>{
    res.send(req.path);                    // /path
    res.send(req.path);                    // /path   (no matters query parameter or not)
})

//protocol
app.get('/protocol', (req, res)=>{
    res.send(req.protocol);                //http
})

//secure     (if https - return true else false)
app.get('/secure', (req, res)=>{
    res.send(req.secure);                 //false
})

//route
app.get('/route', (req, res)=>{
    res.send(req.route);
})
app.get('/route/:userid', (req, res)=>{
    res.send(req.route);
})
/*
{
  "path": "/route",
  "paht": "/route/:userid"           //for next
  "stack": [
    {
      "keys": [],
      "name": "<anonymous>",
      "slash": false,
      "matchers": [
        null
      ],
      "method": "get"
    }
  ],
  "methods": {
    "get": true
  }
} 
*/


//EXPRESS REQUEST (req) METHODS   (send data to server)
//accepts
app.get('/accepts', (req, res)=>{
    if(req.accepts('html')) res.send("<h1>Hello HTML</h1>");
    else if(req.accepts('json')) res.send('Hello JSON');
    else if(req.accepts('xml')) res.send('xml');
    else res.send("Content type not supported");
})

//headers
app.get('/headers', (req, res)=>{
    // res.send(req.headers);                    //sent req info (on server)
    res.send(req.headers.host);                  //localhost: 3000 , specific info
})

//get                 (same as above 2nd)
app.get('/get', (req, res)=>{
    res.send(req.get("Host"));                   //localhost: 3000
})

//is
app.get('/is', (req, res)=>{
    if(req.is('application/json')) res.send("Valid JSON Data");      //works on thunderclient
    else if(req.is('text/html')) res.send("HTML Data");
    else res.status(400).send("Unsupported Content-Type");           //works on browser
})


//EJS (Embedded Javascript )
//EJS Template Tag Syntax
/*
Tag	Description

<% %>	Control flow, no output **

<%= %>Outputs escaped value (safe) **

<%- %>Outputs unescaped value|unsafe

<%# %>Comment (not shown in outp)

<% -%>Removes the following newline

<%- %>Removes whitespace before it

<%_ _%>Removes all whitespace after it
*/

//above included 
// app.set('view engine', 'ejs');        //by default (store in view folder)
// app.set('views', './mytemplate');     //custom
// app.use(express.urlencoded({extended : false}));        //middleware

app.get('/home-page', (req, res)=>{
    res.send("Home Page");
})
app.get('/about-page', (req, res)=>{
    let items2 = ['Apple2', 'Banana2', 'Cherry2'];
    var users = [
        {name: 'Akshay kumar', age : 25, city : 'Delhi'},
        {name: 'Rajkumar', age : 25, city : 'UP'},
        {name: 'Amitabh bachhan', age : 55, city : 'Mumbai'},
        {name: 'Sharukh Khan', age : 35, city : 'Delhi'},
        {name: 'Salman Khan', age : 35, city : 'Bihar'},
    ];
    res.render("about", {title: 'About Page', 
                         message: "Welcome", 
                        //  items2: items2,           //same name so we can use only one
                         items2,
                         users
                        });
})

//form data in ejs
app.get('/form', (req, res)=>{
    res.render('form', {message: null});
})
app.post('/submit', (req, res)=>{
    const name = req.body.myname;
    const message = `Hello ${name} Your form is submitted`
    res.render('form', {message: message});
})

app.listen(3000, ()=>{
    console.log(`Successfully Connected on Port : ${PORT}`);
})
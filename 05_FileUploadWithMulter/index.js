const express = require('express');
const app = express();

const multer = require('multer');
const path = require('path');

app.use(express.urlencoded({extended: false}))        //to accept html form data
app.use(express.json())

app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads')
    },
    filename: (req, file, cb)=>{
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null, newFileName);
    }
})

const fileFilter = (req, file, cb)=>{
    if(file.fieldname === 'user-file'){
        if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
            cb(null, true);
        }else{
            cb(new Error("Only images are allowed"), false)
        }
    }else if(file.fieldname === 'user-multi-files'){
        if(file.mimetype == 'application/pdf'){
            cb(null, true);
        }else{
            cb(new Error("Only pdfs are allowed"), false)
        }
    }else{
        cb(new Error("Unknown Field"), false);
    }

    /*
    // if(file.mimetype.startsWith('image/')){
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true);
    }else{
        cb(new Error("Only images are allowed"), false)
    }
    */
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3                              //3 mb
    },
    fileFilter: fileFilter
})

app.get('/', (req, res)=>{
    res.render('myform');
})

/* 
//FOR SUBMIT SINGLE FILE ONLY
app.post('/submitform', upload.single('user-file'), (req, res)=>{
    if(!req.files || req.file.length === 0){
        return res.status(400).send(`No File uploaded`);
    }
    // res.send(req.file);
    res.send(req.file.filename);
})
*/

/*
//FOR SUBMIT MULTIPLE FILES
app.post('/submitform', upload.array('user-file', 3), (req, res)=>{
    if(!req.files || req.files.length === 0){
        return res.status(400).send(`No File uploaded`);
    }
    // res.send(req.file);
    res.send(req.files);
})
*/

//FOR SUMBIT BOTH TYPES BY FIELDS
app.post('/submitform', upload.fields([{name: 'user-file', maxCount: 1}, {name: 'user-multi-files', maxCount: 3}]), (req, res)=>{
    if(!req.files || req.files.length === 0){
        return res.status(400).send(`No File uploaded`);
    }
    // res.send(req.file);
    res.send(req.files);
})
//error middleware field at last of all middlewares
app.use((err, req, res, next)=>{
    if(err instanceof multer.MulterError){
        if(err.code === 'LIMIT_UNEXPECTED_FILE'){
            return res.status(400).send("Error : Too many files uploaded");
        }
        return res.status(400).send(`Multer error : ${err.message}`);
    }else if(err){
        return res.status(500).send(`Something Went wrong : ${err.message}`);
        
    }
    next();
})

app.listen(3000, ()=>{
    console.log("Server running on PORT : 3000")
})
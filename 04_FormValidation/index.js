const express = require('express');
const app = express();
const {body, validationResult} = require('express-validator')

app.set('view engine', 'ejs');
//middlewares (inbuilt)
app.use(express.json());
app.use(express.urlencoded({extended: false}));

let validationRegistration = [
    body('name')
    .notEmpty().withMessage("Username is required")
    .isLength({min: 3}).withMessage("Username must be at least 3 characters long")
    .trim()
    .isAlpha().withMessage("Name Must contain only letters")
    .custom(value =>{
        if(value === 'admin'){
            throw new Error('Username "admin" is not allowed')
        }
        return true
    })
    // .toLowerCase()
    .customSanitizer(value =>{
        return value.toLowerCase()
    }),

    body('email')
    .isEmail().withMessage("Please provide a valid Email Id")
    .normalizeEmail(),

    body('password')
    .isLength({min: 5, max: 10}).withMessage("Password must be between 5 and 10 char long")
    .isStrongPassword().withMessage("Password must be strong"),

    body('age')
    .isNumeric().withMessage("Age must be numeric")
    .isInt({min: 18}).withMessage("Age must be at least 18 years old"),

    // body('city')
    // .isIn(['Delhi', 'Mumbai', 'Goa', 'Agra']).withMessage("City must be Delhi, Mumbai, Goa or Agra")
]

app.get('/myform', (req, res)=>{
    res.render('myform', {errors : 0});
});
app.post('/saveform', validationRegistration, (req, res)=>{
    const error  = validationResult(req);
    if(error.isEmpty()){
        res.send(req.body);
    }
    // res.send(error)
    res.render('myform', {errors: error.array()})
})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server Running or ${PORT}`);
})
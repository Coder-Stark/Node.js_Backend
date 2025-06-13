const express = require('express');
const app = express();


/* //on localhost
mongoose.connect('mongodb://localhost:27017/api-dev')
.then(()=> console.log("Connected to MongoDB"))
.catch(err => console.log(err));
*/
const connectDB = require('./config/db.js');
connectDB();

const studentRoutes = require('./routes/studentsRoute.js');
const { MulterError } = require('multer');


app.use(express.json());

app.use('/api/students', studentRoutes);

app.use((error, req, res, next)=>{
    if(error instanceof MulterError){
        return res.status(400).send(`Image Error : ${error.message} : ${error.code}`);
    }else if(error){
        return res.status(500).send(`Something went wrong : ${error.message}`);
    }
    next();
})

const PORT = process.env.PORT;
app.listen(PORT, (req, res)=>{
    console.log(`Server is Running on PORT : ${PORT}`);
})
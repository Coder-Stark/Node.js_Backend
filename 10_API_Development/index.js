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


app.use(express.json());

app.use('/api/students', studentRoutes);

const PORT = process.env.PORT;
app.listen(PORT, (req, res)=>{
    console.log(`Server is Running on PORT : ${PORT}`);
})
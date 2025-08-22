const express = require('express');
const printRoutes = require('./routes/printRoutes');
const app = express();

app.set('view engine', 'ejs');

// Use print routes
app.use('/', printRoutes);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is running on PORT : ${port}`);
})
// const express = require('express');
import express from 'express';
const app = express();
import ContactRoutes from "./routes/contactsRoutes.js";

/*MONGODB CONNECTION ****************************** */
import connectDB from "./config/db.js";
connectDB();

/************************************************** */

/*MIDDLEWARES ************************************* */
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

/************************************************** */

//routes (it always below the middlewares)
// app.use("/admin", "ContactRoutes");
app.use("/", ContactRoutes);

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server Started SuccessFully on PORT : ${PORT}`);
})
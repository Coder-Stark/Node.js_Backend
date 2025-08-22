const express = require('express');
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');


app.get('/', async(req, res)=>{
    // res.send("Hello World");
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>PDF Example</title>
                <style>
                    body{font-family: arial;}
                    h1{color: orange;}
                </style>
            </head>
            <body>
                <h1>PDF File Generation</h1>
                <p>This is a PDF Generated form HTML in Express.js</p>
            </body>
            </html>
        `;

        await page.setContent(htmlContent);
        const pdfBuffer = await page.pdf({
            format: 'A4',
            margin: {top: '20px', right: '20px', bottom: '20px', left: '20px'}
        })

        await browser.close();
        res.contentType("application/pdf");
        res.send(pdfBuffer);

    }catch(err){
        console.log(err);
        res.status(500).send("Error generating pdf");
    }
})

app.get('/invoice', async(req, res)=>{
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        //in real mongoDB data is fetch here
        const invoiceData = {
            invoiceNumber : '1234',
            customer: "Shivam",
            product: "Expressjs course",
            price: '99'
        }

        const htmlContent = await ejs.renderFile(path.join(__dirname, 'views', 'invoice.ejs'), invoiceData);   //__dirname (take till root folder path)

        await page.setContent(htmlContent, {waitUntil: 'domcontentloaded'});
        const pdfBuffer = await page.pdf({
            format: 'A4',
            margin: {top: '60px', right: '20px', bottom: '40px', left: '20px'},
            //optional
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: '<div style="text-align: center; font-size: 30px; width: 100%; border-bottom: 1px solid black; padding-bottom: 10px;">PACP</div>',
            footerTemplate: '<div style="text-align: center; font-size: 10px; width: 100%;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
        })

        await browser.close();
        res.contentType("application/pdf");
        res.send(pdfBuffer);

    }catch(err){
        console.log(err);
        res.status(500).send("Error generating pdf");
    }
})


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is running on PORT : ${port}`);
})
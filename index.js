const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
/*
    seting config .env
    {
        PORT_VERSER=***
        USER_GMAIL=***
        PASS_GMAIL=***
    }
*/
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.PASS_GMAIL
    }
})
/*
    POST request send email and toKen
*/
app.post('/sendgmail', (req, res) => {
    try{
        const gmail = req.body.gmail;
        const status = sendResetPasswordEmail(gmail);
        res.json(status);
    }catch{
        res.json({status:500,message:"error"});
    }
})
/* 
    function send reset password to email
*/
const sendResetPasswordEmail = (to) => {
    const mailOptions = {
      from: 'test@gmail.com',
      to,
      subject: 'hello',
      html: `<p>test nodejs send Gmail.</p>`,
    };
    try{
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
        return {status:200,message:"ok"}
    }catch{
        return {status:501,message:"error"}
    }
};



app.listen(process.env.PORT_VERSER,()=>{console.log("http://localhost:"+process.env.PORT_VERSER)})
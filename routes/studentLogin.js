const express = require("express");
const router = express.Router();

var crypto = require('crypto');
var nodemailer = require('nodemailer');
const Student = require('../modals/studentModal.js');
const Token = require('../modals/tokenModel.js');
const ForgetPasswordToken = require('../modals/changePasswordToken.js');
var md5 = require('md5');


function createTokenAndSendEmail(studentEmail,studentPassword,studentRollNo,studentYearOfStudying,studentName,res){ 
    
    const token = crypto.randomBytes(16).toString('hex');
    console.log(token);

    const newToken = new Token({
        
        token : token,
        email: studentEmail,
        password: studentPassword,
        rollNumber: studentRollNo,
        name: studentName,
        yearOfStudying: studentYearOfStudying,
    });

    newToken.save(function(err){

        if(err)
        {
            console.log(err);
            res.status(500).json({err: true, msg: "OOPS! Some Error occurred.Please try again"});
        }
        else
        {
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                ignoreTLS: true,
                service: 'gmail',
                auth: {
                  user: 'sweprojectams@gmail.com',
                  pass: process.env.EMIAL_PASS,
                //   pass: process.env.EMAIL_PASS,
                }
              });
              
              var mailOptions = {
                from: 'sweprojectams@gmail.com',
                to:studentEmail,
                subject: 'verify your account for ams',
                text: 'To verify your account click the following link : https://signin-rest-api.herokuapp.com/student/verify/' + token,
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  res.status(500).json({err: true,msg: "OOPS! Some Error occurred.Please try again"});
                } else {
                  console.log('Email sent');
                  res.status(200).json({err: false,msg: 'verification email sent'});
                }
            });
        }
            
    });


}

function validateEmailAndPassword(email,password)
{
    if(email.includes("@iiitr.ac.in") && password.length >= 8)
        return true;
    else
        return false;
}



router.get("/verify/:token",(req,res) => {

    console.log(req.params);

    Token.findOne({token: req.params.token}, (err,foundToken) => {

        if(err)
            res.status(500).send({err: true,msg: 'We were unable to find a valid token. Your token may have expired.'});
        else
        {
            if(foundToken)
            {
                const newStudent = new Student({
    
                    email: foundToken.email,
                    name: foundToken.name,
                    password: md5(foundToken.password),
                    yearOfStudying:foundToken.yearOfStudying,
                    rollNumber: foundToken.rollNumber,
                }) ;

                newStudent.save(function(err){

                    if(err)
                    {
                        console.log(err);
                        res.status(500).json({err: true,msg: "OOPS! Some Error occurred.Please try again later"});
                    }
                    else
                    {
                        Token.deleteOne({token: req.params.token},function(err,result){

                            if(err)
                            {
                                res.status(500).json({err: true,msg: "OOPS! Some Error occurred.Please try again later"});
                            }
                            else
                                res.status(200).send('successfully verified email');
                        })
                    }
                    
                        
                });

                

                
            }
            else
                res.status(500).send({err: true,msg: 'We were unable to find a valid token. Your token may have expired or your account is already verified'});
        }


    });


});

router.post("/login",function(req,res){

    Student.findOne({email: req.body.email},function(err,foundStudent){

        if(err)
        {
            res.status(500).json({err: true, msg: "OOPS! Some Error occurred.Please try again"});
        }
        else
        {
            if(foundStudent)
            {   
                if(foundStudent.password == md5(req.body.password))
                    res.status(200).json({err: false,msg: foundStudent._id});
                else
                {
                    res.status(400).json({err: true,msg: "Invalid password"});
                }
            }
            else
            {
                res.status(400).json({err: true,msg: 'We were unable to find a user for this email.First register yourself to AMS or verify your email'});
            }
        }
    });
});

router.post("/register",(req,res) => { 

    console.log(req.body);
    console.log(Student);

    if(validateEmailAndPassword(req.body.email,req.body.password))
    {
        Student.findOne({email: req.body.email},(err,foundStudent) => {

            if(err)
            {
                console.log(err);
                res.status(500).json({err: true,msg: "OOPS! Some Error occurred.Please try again later"});
            }
            else
            {
                if(foundStudent)
                {

                    res.status(400).json({ err: true,msg: 'The email address you have entered is already associated with another account.' });
    
                }
                else
                {
                    
                    var email = req.body.email;
                    var rollNo = email.slice(0,email.indexOf('@')); 
                    console.log(rollNo);
    

    
                    createTokenAndSendEmail(req.body.email,req.body.password,rollNo,req.body.yearOfStudying,req.body.name,res);
    
    
    
    
    
    
                }
            }
        });
    }
    else
        res.status(400).json({err: true,msg: "Invalid email or password.Email should be of iitr domain and length of password must be atleast 8"});


});

router.post("/resetPassword",(req,res) => {

    Student.findOne({email: req.body.email},function(err,foundStudent){

        if(err)
        {
            res.status(500).json({err: true, msg: "OOPS! Some Error occurred.Please try again"});
        }
        else
        {
            if(foundStudent)
            {   
                const tokenNum = crypto.randomBytes(16).toString('hex');
                console.log(tokenNum);
                const forgetPasswordToken = new ForgetPasswordToken({
                    token: tokenNum,
                    email: req.body.email,
                    password: md5(req.body.password),

                });
                forgetPasswordToken.save(function(err){
                    if(err)
                    {
                        console.log(err);
                        res.status(500).json({err: true, msg: "OOPS! Some Error occurred.Please try again"});
                    }
                    else
                    {
                        var transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            ignoreTLS: true,
                            service: 'gmail',
                            auth: {
                              user: 'sweprojectams@gmail.com',
                              pass: process.env.EMIAL_PASS,
                            }
                          });
                          
                          var mailOptions = {
                            from: 'sweprojectams@gmail.com',
                            to:req.body.email,
                            subject: 'verify your account for ams',
                            text: 'To verify your account click the following link : https://signin-rest-api.herokuapp.com/student/verifyResetPasswordRequest/' + tokenNum,
                          };
                          
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                              res.status(500).json({err: true,msg: "OOPS! Some Error occurred.Please try again"});
                            } else {
                              console.log('Email sent');
                              res.status(200).json({err: false,msg: 'verification email sent'});
                            }
                        });
                    }
                })
                res.status(200).json({err: false,msg: "verification email sent"});


            }
            else
            {
                res.status(400).json({err: true,msg: 'We were unable to find a user for this email.First register yourself to AMS or verify your email'});
            }
        }
    });

});

router.get("/verifyResetPasswordRequest/:token",(req,res) => {
    console.log(req.params);

    ForgetPasswordToken.findOne({token: req.params.token}, (err,foundToken) => {
        
        console.log(foundToken);
        if(err)
            res.status(500).send({err: true,msg: 'We were unable to find a valid token. Your token may have expired.'});
        else
        {
            console.log(foundToken);
            if(foundToken)
            {
                Student.findOne({email: foundToken.email},(err,foundStudent) => {

                    if(err)
                    {
                        res.status(500).send({err: true,msg: "OOPS! Some error occured"});
                    }
                    else
                    {
                        foundStudent.password = foundToken.password;
                        foundStudent.save(function(err) {
                            if(err)
                                res.status(500).send({err: true,msg: "OOPS! Some error occured"});
                            else
                                res.status(200).send({err: false,msg: "Successfully changed password"});
                            

                        })
                    }
                });

            }
            else
                res.status(500).send({err: true,msg: 'We were unable to find a valid token. Your token may have expired or your account is already verified'});
        }


    });
})




module.exports = router;

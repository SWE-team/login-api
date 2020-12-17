const express = require("express");
const router = express.Router();

var crypto = require('crypto');
var nodemailer = require('nodemailer');
const Faculty = require('../modals/facultyModal.js');
const Token = require('../modals/tokenModel.js');
const ForgetPasswordToken = require('../modals/changePasswordToken.js');
var md5 = require('md5');


function createTokenAndSendEmail(facultyEmail,facultyPassword,facultyId,facultyName,res){ 
    
    const token = crypto.randomBytes(16).toString('hex');
    console.log(token);

    const newToken = new Token({
        
        token : token,
        email: facultyEmail,
        password: facultyPassword,
        name: facultyName,
        facultyId: facultyId,
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
                // ignoreTLS: true,
                service: 'gmail',
                auth: {
                  user: 'sweprojectams@gmail.com',
                  pass: process.env.EMIAL_PASS,
                }
              });
              
              var mailOptions = {
                from: 'sweprojectams@gmail.com',
                to:facultyEmail,
                subject: 'verify your account for ams',
                text: 'To verify your account click the following link : https://signin-rest-api.herokuapp.com/faculty/verify/' + token,
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
    if((email.includes("@iiitr.ac.in") || email.includes("@iith.ac.in")) && password.length >= 8)
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
                const newFaculty = new Faculty({
    
                    email: foundToken.email,
                    name: foundToken.name,
                    password: md5(foundToken.password),
                    facultyId: foundToken.facultyId,
                }) ;

                newFaculty.save(function(err){

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

    Faculty.findOne({email: req.body.email},function(err,foundFaculty){

        if(err)
        {
            res.status(500).json({err: true, msg: "OOPS! Some Error occurred.Please try again"});
        }
        else
        {
            if(foundFaculty)
            {   
                if(foundFaculty.password == md5(req.body.password))
                    res.status(200).json({err: false,msg: foundFaculty._id});
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
    console.log(Faculty);

    if(validateEmailAndPassword(req.body.email,req.body.password))
    {
        Faculty.findOne({email: req.body.email},(err,foundFaculty) => {

            if(err)
            {
                console.log(err);
                res.status(500).json({err: true,msg: "OOPS! Some Error occurred.Please try again later"});
            }
            else
            {
                if(foundFaculty)
                {

                    res.status(400).json({ err: true,msg: 'The email address you have entered is already associated with another account.' });
    
                }
                else
                {
                    
                    var email = req.body.email;
                    var facultyId = email.slice(0,email.indexOf('@')); 
                    console.log(facultyId);
    

    
                    createTokenAndSendEmail(req.body.email,req.body.password,facultyId,req.body.name,res);
    
    
    
    
    
    
                }
            }
        });
    }
    else
        res.status(400).json({err: true,msg: "Invalid email or password.Email should be of iitr domain and length of password must be atleast 8"});


});

router.post("/resetPassword",(req,res) => {

    Faculty.findOne({email: req.body.email},function(err,foundFaculty){

        if(err)
        {
            res.status(500).json({err: true, msg: "OOPS! Some Error occurred.Please try again"});
        }
        else
        {
            if(foundFaculty)
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
                            text: 'To verify your account click the following link : https://signin-rest-api.herokuapp.com/faculty/verifyResetPasswordRequest/' + tokenNum,
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
                Faculty.findOne({email: foundToken.email},(err,foundFaculty) => {

                    if(err)
                    {
                        res.status(500).send({err: true,msg: "OOPS! Some error occured"});
                    }
                    else
                    {
                        foundFaculty.password = foundToken.password;
                        foundFaculty.save(function(err) {
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

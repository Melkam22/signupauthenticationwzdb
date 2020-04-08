const express = require('express');
const router = express.Router();

//import the schema
const schema = require('../models/schema');
//import bcrypt
const bcrypt = require('bcryptjs');

router.get('/login', (req, res)=>res.render('login'));
router.get('/register', (req, res)=>res.render('register'));

//route for data Registration
router.post('/register', (req, res)=>{
   /*  console.log(req.body);
    res.send('OK!');  *///replace these with the below
const {name, email, password, password2} = req.body;
 let globalMessage = [];
        //if inputs are empty
 if(!name || !email || !password || !password2){
     globalMessage.push({msg: 'All fields need to be filled!'});
 }
     //if passwords do not match
     if(password !== password2){
         globalMessage.push({msg: 'The two passwords do not match.'});
     }
     //if password is not  strong
     if(password.length < 7){
         globalMessage.push({msg: 'Password needs to have minimum 7 characters.'})
     }
     //if all is ok
     if(globalMessage.length > 0){
         res.render('register', {
             globalMessage,
             name,
             email,
             password,
             password2
         });
        } else{
            /* res.send('OK') instead of this we ll add the below*/
            schema.findOne({email: email})
            .then(user=> {
                if(user){
                   /*  globalMessage.push({msg: 'Email already registered.'}); */
                    res.redirect('register', {
                        globalMessage,
                        name,
                        email,
                        password,
                        password2
                    })
                }else{
                    const mySchema = new schema({
                        name, 
                        email, 
                        password
                    })
                    console.log(mySchema)
                    res.send('OKAY') 
                }
            })
            .catch(err => console.log(err));
        }  
    })



                 
         /* console.log(mySchema);
         res.send("Hi!") replace it with bcrypt*/
        /*  bcrypt.genSalt(10, (err, salt)=>
         bcrypt.hash(mySchema.password, salt, (err, hash)=>{
             if(err) throw err;
             //setting password & saving it to db
             mySchema.password = hash;
             mySchema.save()
             .then(guest=>{
                 res.redirect('clients/login');
             })
             .catch(err => Console.log(err));
         })) */
  

module.exports = router;
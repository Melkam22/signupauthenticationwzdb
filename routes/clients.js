const express = require('express');
const router = express.Router();

 

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
     if(password2 !== password2){
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
     } else {
         res.send('OK!')
     } 
})

module.exports = router;
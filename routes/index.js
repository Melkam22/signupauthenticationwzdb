const express = require('express');
const router = express.Router();
//importing auth.js to prevent unauthorized logins
const {ensureAuthenticated} = require('../config/auth');

router.get('/', (req, res)=> res.render('bienvenu'));

//route to dashboard @ the end we ll add ensureAuthenticated 
/* router.get('/dashboard', ensureAuthenticated, (req, res)=>
res.render('dashboard')); to add client's name do the below*/

router.get('/dashboard', ensureAuthenticated, (req, res)=>
res.render('dashboard',{
    name: req.user.name
}));


module.exports = router;

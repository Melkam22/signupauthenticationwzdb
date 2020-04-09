const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> res.render('bienvenu'));

//route to dashboard
router.get('/dashboard', (req, res)=>res.render('dashboard'));

module.exports = router;
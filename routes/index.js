const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> res.send('Bien venu!'))

module.exports = router;
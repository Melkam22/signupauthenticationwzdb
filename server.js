const express = require('express');
const app = express();

//importing & requiring my index.js bien venu route
app.use('/', require('./routes/index'));

//importing & requiring my clients.js route
app.use('/clients', require('./routes/clients'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server is running on ${PORT}`));
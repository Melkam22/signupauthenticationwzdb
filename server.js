const express = require('express');
const mongoose = require('mongoose');

//require expressLayouts (EJS)
const expressLayouts = require('express-ejs-layouts');

const app = express();

//link to the database
const dataBase = require('./config/keys').MongoURI;
mongoose.connect(dataBase, {useNewUrlParser: true})
.then(()=>console.log('MongoDB is connected'))
.catch(err=> console.log(err));

//EJS, from expressLayouts documentation
app.set('view engine', 'ejs');
app.use(expressLayouts);

//importing & requiring my index.js bien venu route
app.use('/', require('./routes/index'));

//importing & requiring my clients.js route
app.use('/clients', require('./routes/clients'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server is running on ${PORT}`));
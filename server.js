const express = require('express');
//require expressLayouts (EJS)
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

 


const app = express();
 

//link to the database
const dataBase = require('./config/keys').MongoURI;
mongoose.connect(dataBase, {useNewUrlParser: true})
.then(()=>console.log('MongoDB is connected'))
.catch(err=> console.log(err));

//EJS, from expressLayouts documentation
app.use(expressLayouts);
app.set('view engine', 'ejs');

//bodyParser
app.use(express.urlencoded({extended: false}));

//importing & requiring my index.js bien venu route
app.use('/', require('./routes/index'));

//importing & requiring my clients.js route
app.use('/clients', require('./routes/clients'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server is running on ${PORT}`));
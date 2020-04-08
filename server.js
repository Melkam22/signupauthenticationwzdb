const express = require('express');
//require expressLayouts (EJS)
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
//require flash
const flash = require('connect-flash');
const session = require('express-session');
 


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

//express-session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
//connect flash middleware
app.use(flash());

//reusable global variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.failure_msg = req.flash('failure_msg');
    next();
})

//importing & requiring my index.js bien venu route
app.use('/', require('./routes/index'));

//importing & requiring my clients.js route
app.use('/clients', require('./routes/clients'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server is running on ${PORT}`));
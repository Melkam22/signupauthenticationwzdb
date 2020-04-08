const express = require('express');
//require expressLayouts (EJS)
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
//require flash
const flash = require('connect-flash');
const session = require('express-session');
//req passport
const passport = require('passport');

const app = express();

//require passport
require('./config/passport')(passport);


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

//from passport documentation, along wz serializeuser on passport.js
app.use(passport.initialize());
app.use(passport.session());


//connect flash middleware
app.use(flash());

//reusable global variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//importing & requiring my index.js bien venu route
app.use('/', require('./routes/index'));

//importing & requiring my clients.js route
app.use('/clients', require('./routes/clients'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server is running on ${PORT}`));
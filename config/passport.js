const LocalStrategy = require('passport-local').Strategy;
const mogoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = require('..models/schema');
// modules for express server
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import dotenv from 'dotenv';
dotenv.config();

// Database modules
import mongoose from 'mongoose';
import db from './db';

// modules for authentication
import session from 'express-session'; // use session
import passport from 'passport'; // authentication
import passportLocal from 'passport-local'; // authentication strategy

// modules for jwt support
import cors from 'cors';
import passportJWT from 'passport-jwt';

// define JWT aliases
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

// authentication objects
let localStrategy = passportLocal.Strategy; // alias
// import User Model
import User from '../Models/user'

mongoose.connect(db.remoteURI as string);

// DB Connection Events
mongoose.connection.on('connected', () =>{
    console.log(`Connected to MongoDB`);
});

mongoose.connection.on('disconnected', () =>{
    console.log('Disconnected from MongoDB');
});

import indexRouter from '../Routes/index';
import authRouter from '../Routes/auth';

let app = express();

// middleware modules
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors()); // adds CORS to the config

// setup express session
app.use(session({
  secret: db.sessionSecret,
  saveUninitialized: false,
  resave: false
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// implement an Auth Strategy
passport.use(User.createStrategy());

User.serializeUser()

// serialize and deserialize the user data
passport.serializeUser(User.serializeUser() as any);
passport.deserializeUser(User.deserializeUser());


// setup JWT Options
let jwtOptions = 
{
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: db.sessionSecret
}

// setup JWT Strategy
let strategy = new JWTStrategy(jwtOptions, function(jwt_payload, done)
{
    try 
    {
        const user = User.findById(jwt_payload.id);
        if (user) 
        {
            return done(null, user);
        }
        return done(null, false);
    } 
    catch (error) 
    {
        return done(error, false);
    }
});

passport.use(strategy);

// authentication routes
app.use('/api/', authRouter);

// protected routes
app.use('/api/', /*passport.authenticate('jwt', {session: false}),*/ indexRouter);

export default app;

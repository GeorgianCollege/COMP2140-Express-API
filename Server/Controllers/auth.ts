import express, {Request, Response, NextFunction} from 'express';

import passport from 'passport';

import User from '../Models/user';

import { GenerateToken } from '../Util/index';

// Process Functions
export function ProcessLogin(req: Request, res: Response, next: NextFunction): void
{
    passport.authenticate('local', (err: Error, user: UserDocument, info: any) =>
    {
        // are there server errors?
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        // are there login errors?
        if(!user)
        {
            return res.json({success: false, msg: 'ERROR: Authentication Error'});
        }

        req.logIn(user, (err) =>
        {
            // are there db errors?
            if(err)
            {
                console.error(err);
                res.end(err);
            }

            const authToken = GenerateToken(user);

            return res.json({success: true, msg: 'User Logged In Successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                emailAddress: user.emailAddress
            }, token: authToken});
        });
        return;
    })(req, res, next);
}

export function ProcessRegister(req: Request, res: Response, next: NextFunction): void
{
    // instantiate a new user object
    let newUser = new User
    ({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + " " + req.body.lastName
    });

    User.register(newUser, req.body.password, (err) =>
    {
        if(err)
        {
            if(err.name == "UserExistsError")
            {
                console.error('ERROR: User Already Exists!');
            }
            console.error(err.name); // other error
            return res.json({success: false, msg: 'ERROR: Registration Failure'});
        }
        return res.json({success: true, msg: 'User Registered Successfully!'});
    });
}

export function ProcessLogout(req: Request, res: Response, next: NextFunction): void
{
    req.logout(() =>{
        console.log("User Logged Out");
        // Note: the client will need remove the token from local storage - the server cannot expire the token
    });

    res.json({success: true, msg: 'User Logged out Successfully!'});
}
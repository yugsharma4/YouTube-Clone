import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;

    //TOKEN NOT AVAIALBLE
    if(!token) return next(createError(401,"You are not authenticated!"));

    //VERIFY THE TOKEN
    jwt.verify(token,process.env.JWT,(err,user) => {
        if(err) return next(createError(403,"Token is not valid!"));

        req.user = user;
        next();
    });
};
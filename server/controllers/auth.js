import mongoose from 'mongoose'
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';


//SIGN UP (CREATE USER)

export const signup = async(req,res,next) => {
    try {
        // Encrypt password using bcrypt library
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            ...req.body,
            password:hash,
        });

        await newUser.save();
        res.status(200).json("User has been created!!!");
            
    } catch (error) {
        next(error);
    }
    
}

//SIGN IN

export const signin = async(req,res,next) => {
    try {
        
        const loginUser = await User.findOne({
            name: req.body.name
        });

        //User not found
        if(!loginUser) return next(createError(404,"User not found!"));

        //User available on DB
        const enteredPassword = req.body.password;
        const isCorrect = bcrypt.compareSync(enteredPassword, loginUser.password);
        
        if(!isCorrect){
            return next(createError(400,"Wrong credentials!!"));
        }

        //CREATE TOKEN FOR LOGIN USER
        const token = jwt.sign({
            id:loginUser._id
        },
        process.env.JWT,{
            expiresIn: '3d'
        }
        );
        //HIDING PASSWORD TO SEND BEFORE USER
        const {password,...others} = loginUser._doc;
        
        //SEND THIS TOKEN TO USER
        //Secure way
        res.cookie("access_token",token,{
            httpOnly:true  //Third party scripts can't use our cookie
        })
        .status(200)
        .json(others);
    
    } catch (error) {
        next(error);
    }   
}

//SIGN IN WITH GOOGLE

export const googleSignIn = async(req,res,next) => {
    try {
        const loginUser = await User.findOne({email: req.body.email});
    
    //IF USER EXIST --> CREATE TOKEN ONLY AND PASS TO COOKIE
    if(loginUser){
        
        //CREATE TOKEN FOR LOGIN USER
        const token = jwt.sign({
            id:loginUser._id
        },
        process.env.JWT,{
            expiresIn: '3d'
        }
        );
        
        //SEND THIS TOKEN TO USER
        //Secure way
        res.cookie("access_token",token,{
            httpOnly:true  //Third party scripts can't use our cookie
        })
        .status(200)
        .json(loginUser._doc);
    
    }else{ //NEW USER LOGIN FROM GOOGLE
        const newUser = new User({
            ...req.body,
            fromGoogle: true,
        });

        const savedUser = await newUser.save();

         //CREATE TOKEN FOR LOGIN USER
         const token = jwt.sign({
            id:savedUser._id
        },
        process.env.JWT,{
            expiresIn: '3d'
        }
        );
        
        //SEND THIS TOKEN TO USER
        //Secure way
        res.cookie("access_token",token,{
            httpOnly:true  //Third party scripts can't use our cookie
        })
        .status(200)
        .json(savedUser._doc);
      }
    } catch (error) {
        next(error);
    }
    
}





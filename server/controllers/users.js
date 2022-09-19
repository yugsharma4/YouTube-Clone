import { createError } from '../error.js';
import User from '../models/User.js';
import Video from '../models/Video.js';

//UPDATE USER
export const updatedUser = async(req,res,next) => {
    //VERIFY TOKEN AND ID
    if(req.params.id == req.user.id){
        try {
            //GET AND UPDATE USER
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{
                new:true
            });
            res.status(200).json(updateUser);
        } 
        catch (error) {
            next(error);
        }
    }
    else{
        return next(createError(403,"You are not authorized to update your account!"));
    }
}

//DELETE USER
export const deleteUser = async(req,res,next) => {
    if(req.params.id == req.user.id){
        try {
            //GET AND DELETE USER
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted!!");
        } 
        catch (error) {
            next(error);
        }
    }
    else{
        return next(createError(403,"You are not authorized to delete your account!"));
    }
}

//GET USER
export const getUser = async(req,res,next) => {
        try {
            //GET USER
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        } 
        catch (error) {
            next(error);
        }
}
//SUBSCRIBE
export const subscribe = async(req,res,next) => {
    try {
        //INCREASE THE SUBSCRIBE USERS LIST
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers:req.params.id},
        });

        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:1},
        });

        res.status(200).json("Subscription successfull !!");
    } catch (error) {
        next(error);
    }
}

//UNSUBSCRIBE
export const unsubscribe = async(req,res,next) => {
    try {
        //DECREASE THE SUBSCRIBE USERS LIST

        //req.user --> current user's id
        //params.id --> channel's id
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers:req.params.id},
        });

        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:-1},
        });

        res.status(200).json("Unsubscription successfull !!");
    } catch (error) {
        next(error);
    }
}

//LIKE
export const like = async(req,res,next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;

    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id}, //prevent like multiple times (addToSet)
            $pull:{dislikes:id} //can't like and dislike at the same time so pull
        });

        res.status(200).json("The video has been liked!");
    } catch (error) {
        next(error);
    }
}

//DISLIKE
export const dislike = async(req,res,next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;

    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id}, //prevent like multiple times (addToSet)
            $pull:{likes:id} //can't like and dislike at the same time so pull
        });

        res.status(200).json("The video has been disliked!");

    } catch (error) {
        next(error);
    }
}
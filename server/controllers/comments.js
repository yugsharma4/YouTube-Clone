import User from '../models/User.js';
import Video from '../models/Video.js';
import Comment from '../models/Comment.js';
import { createError } from "../error.js";

//ADD COMMENT
export const addComment = async(req,res,next) => {
    const newComment = new Comment({
        ...req.body,
        userId:req.user.id,
    });

    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (error) {
        next(error);
    }
};

//DELETE COMMENT

export const deleteComment = async(req,res,next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);

        //USERID === COMMENT'S OWENERID || USERID === VIDEO'S OWNERID --> DELETE THE COMMENT
        if(req.user.id === comment.userId || req.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("The comment has been deleted!");
        }else{
            return next(createError(403, "You can delete ony your comment!"));
        }
    } catch (error) {
        next(error);
    }
};

//GET ALL COMMENTS ON PARTICULAR VIDEO (fetch videoId from URL)

export const getComments = async (req, res, next) => {
    try {
      const comments = await Comment.find({ videoId: req.params.videoId });
      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  };


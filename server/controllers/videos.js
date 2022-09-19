import User from '../models/User.js';
import Video from '../models/Video.js';

//CREATE A VIDEO
export const addVideo = async(req,res,next) => {
    try {
        const newVideo = new Video({
            userId:req.user.id,
            ...req.body,
        });

        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (error) {
        next(error);
    }
}

//UPDATE A VIDEO

// userid --> req.user.id
// video's id --> req.params.id

export const updateVideo = async(req,res,next) => {
    try {
        //GET VIDEO'S ID FROM DB
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"));
        
        //LOGIN USER ID == ADD VIDEO'S USERID --> THEN UPDATE
        if (req.user.id === video.userId) {
          const updatedVideo = await Video.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedVideo);
        } else {
          return next(createError(403, "You can update only your video!"));
        }
      } catch (err) {
        next(err);
      }
}

//DELETE VIDEO
export const deleteVideo = async (req, res, next) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) return next(createError(404, "Video not found!"));
      if (req.user.id === video.userId) {
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).json("The video has been deleted.");
      } else {
        return next(createError(403, "You can delete only your video!"));
      }
    } catch (err) {
      next(err);
    }
  };

  //GET VIDEO
  export const getVideo = async (req, res, next) => {
    try {
      const video = await Video.findById(req.params.id);
      res.status(200).json(video);
    } catch (err) {
      next(err);
    }
  };

  //ADD VIEW
  export const addView = async (req, res, next) => {
    try {
      await Video.findByIdAndUpdate(req.params.id,{
        $inc:{views:1},
      });
      res.status(200).json("The view has been increased!");
    } catch (err) {
      next(err);
    }
  };

  //RANDOM VIDEO
  export const random = async (req, res, next) => {
    try {
      const videos = await Video.aggregate([{$sample:{size: 40}}]);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };

  //TRENDING
  export const trend = async (req, res, next) => {
    try {
      const videos = await Video.find().sort({views:-1}); //views:-1(latest videos)
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };

  //SUBSCRIBE

  export const sub = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const subscribedChannels = user.subscribedUsers;

      const list = await Promise.all(
        subscribedChannels.map(async (channelId) => {
          return await Video.find({ userId: channelId });
        })
      );
  
      res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
      next(err);
    }
  };

  
export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(","); // api/videos/tags?tags=js,q
    try {
      const videos = await Video.find({ tags: { $in: tags } }).limit(20);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };
  
  export const search = async (req, res, next) => {
    const query = req.query.q; //api/videos/search?q=ST --> fetch all videos whose title string having ST in it
    try {
      const videos = await Video.find({
        title: { $regex: query, $options: "i" }, //options i --> search both upper & lowercase title
      }).limit(40);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };


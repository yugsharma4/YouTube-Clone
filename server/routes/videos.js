import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { addVideo,updateVideo,getVideo,deleteVideo,
    addView,trend,random,sub,getByTag,search,
} from '../controllers/videos.js';

const router = express.Router();

//create a video
router.post('/', verifyToken, addVideo);

//update a video
router.put("/:id", verifyToken, updateVideo);

//delete a video
router.delete("/:id", verifyToken, deleteVideo);

//get a video
router.get("/find/:id", getVideo);

//add view
router.put("/view/:id", addView);

//trend
router.get("/trend", trend);

//random
router.get("/random", random);

//subscribe 
router.get("/sub",verifyToken, sub);

//get video by tags
router.get("/tags", getByTag);

//search
router.get("/search", search)

export default router;
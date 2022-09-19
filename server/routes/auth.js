import express from 'express';

import {googleSignIn, signin, signup} from '../controllers/auth.js';

const router = express.Router();

//CREATE USER
router.post('/signup',signup);

//SIGN IN
router.post('/signin',signin);

//GOOGLE SIGN IN
router.post('/google',googleSignIn);

export default router;
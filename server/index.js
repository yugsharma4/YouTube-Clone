import express from 'express'; //We can use this import statement By adding type in package.json
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";

import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8800;

//DB connection
const connect = () => {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Connected to DB!!");
      })
      .catch((err) => {
        throw err;
      });
  };

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

//error handlers
app.use((err,req,res,next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!!";

    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.listen(PORT, () => {
    connect();
    console.log(`Server is running on port: ${PORT}...`);
})
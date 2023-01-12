import express from "express";
import {
    createPost,
    deletePost,
    likeAndUnlikePost,
    getPostsOfFollowing,
    updateCaption,
    addComment,
    deleteComment,
} from "../controllers/post.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);

router
    .route("/post/:id")
    .get(isAuthenticated, likeAndUnlikePost)
    .put(isAuthenticated, updateCaption)
    .delete(isAuthenticated, deletePost);

router.route("/posts").get(isAuthenticated, getPostsOfFollowing);
router
    .route("/post/comment/:id")
    .post(isAuthenticated, addComment)
    .delete(isAuthenticated, deleteComment);

export { router as post };

import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

import {
    register,
    login,
    logout,
    updateProfile,
    updatePassword,
    deleteMyProfile,
    myProfile,
    userProfile,
    getAllUsers,
    forgotPassword,
    resetPassword,
    getMyPosts,
    getUserPosts,
} from "../controllers/user.js";

import { followUser } from "../controllers/post.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated, logout);
router.route("/follow/:id").get(isAuthenticated, followUser);

router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/delete/me").delete(isAuthenticated, deleteMyProfile);
router.route("/myProfile").get(isAuthenticated, myProfile);
router.route("/my/posts").get(isAuthenticated,getMyPosts)
router.route("/user/:id").get(isAuthenticated, userProfile);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/userposts/:id").get(getUserPosts);


export { router as user };

import "./Home.css";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../Post/Post.jsx";
import { User } from "../User/User.jsx";
import { getFollowingUserPosts, getAllUsers } from "../../Actions/User.js";
import { Loader } from "../Loader/Loader.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "../Header/Header.jsx";

export const Home = () => {
    const dispatch = useDispatch();
    const {
        loading,
        posts,
        error: postError,
    } = useSelector((state) => state.postOfFollowingReducer);
    const {
        loading: loadingUsers,
        users,
        error: errorUsers,
    } = useSelector((state) => state.allUsersReducer);

    const { error: likedError, message: likedMessage } = useSelector(
        (state) => state.likeReducer
    );

    useEffect(() => {
        (async function () {
            await dispatch(getFollowingUserPosts());
            await dispatch(getAllUsers());
        })();
    }, [toast, dispatch]);

    useEffect(() => {
        (async function () {
            if (postError) {
                toast.error(postError);
                await dispatch({ type: "clearErrors" });
            }
            if (likedError) {
                toast.error(likedError);
                await dispatch({ type: "clearErrors" });
            }
            if (likedMessage) {
                toast.success(likedMessage);
                await dispatch({ type: "clearMessage" });
            }
        })();
    }, [likedError, likedMessage, postError, dispatch]);

    return loading || loadingUsers ? (
        <Loader />
    ) : (
        <div className="home">
            <div className="home-adsleft"></div>
            <div className="homeleft">
                <ToastContainer autoClose={2000} />

                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Post
                            key={post._id}
                            postId={post._id}
                            caption={post.caption}
                            postImage={post.image.url}
                            likes={post.likes}
                            comments={post.comments}
                            ownerImage={post.owner.avatar.url}
                            ownerName={post.owner.name}
                            ownerId={post.owner._id}
                        />
                    ))
                ) : (
                    <Typography> No any posts </Typography>
                )}
            </div>

            <div className="homeright">
                <h3 style={{ marginLeft: "10px", marginBottom: "10px" }}>
                    All Users
                </h3>
                {users && users.length > 0 ? (
                    users.map((user) => (
                        <User
                            key={user._id}
                            userId={user._id}
                            name={user.name}
                            avatar={user.avatar.url}
                        />
                    ))
                ) : (
                    <Typography> No any Users </Typography>
                )}
            </div>
        </div>
    );
};

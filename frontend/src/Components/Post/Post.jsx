import "./Post.css";
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
} from "@mui/icons-material";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingUserPosts, getAllUsers } from "../../Actions/User.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    addCommentOnPost,
    deletePost,
    likePost,
    updatePost,
} from "../../Actions/Post.js";

import {
//   getFollowingPosts,
   getMyPosts,
//     loadUser
} from "../../Actions/Post.js";

import { User } from "../User/User.jsx";
import { CommentCard } from "../CommentCard/CommentCard.jsx";

export const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false,
}) => {



    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userReducer);
    const [liked, setLiked] = useState(false);
    const [likesUser, setLikesUser] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);

    const handleLike = async () => {
        setLiked(!liked);
        await dispatch(likePost(postId));
        if (isAccount) {
          dispatch(getMyPosts())

        } else {
            dispatch(getFollowingUserPosts());
        }
    };

const addCommentHandler = async(e) => {
  e.preventDefault()
  await dispatch(addCommentOnPost(postId,commentValue))
        if (isAccount) {
        await  dispatch(getMyPosts())

        } else {
         await   dispatch(getFollowingUserPosts());
        }

  setCommentToggle(false)
}

const deletePostHandler =async(e) => {
    e.preventDefault();
    await dispatch(deletePost(postId));
    await dispatch(getMyPosts());
}


 const updateCaptionHandler = async(e) => {
    e.preventDefault();
    await dispatch(updatePost(captionValue, postId));
    await dispatch(getMyPosts());
  };

    useEffect(() => {
        likes.forEach(
            (item) => {
                if (item.user._id === user._id) {
                    setLiked(true);
                }
            },
            
        );

    },[dispatch,likes,commentToggle, user._id]);




return (
        <div className="post">
            <div className="postHeader">
                {isAccount ? (
          <Button onClick={() => setCaptionToggle(!captionToggle)}>
                        {" "}
                        <MoreVert />{" "}
                    </Button>
                ) : null}
            </div>

            <img src={postImage} alt="PostImage" />

            <div className="postDetails">
                <Avatar
                    src={ownerImage}
                    alt="User"
                    sx={{ height: "3vmax", width: "3vmax" }}
                />
                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700}>{ownerName}</Typography>
                </Link>
                <Typography
                    fontWeight={100}
                    color="rgba(0, 0, 0, 0.582)"
                    style={{ alignSelf: "center" }}
                >
                    {caption}
                </Typography>
            </div>

            <button
                style={{
                    border: "none",
                    backgroundColor: "white",
                    cursor: "pointer",
                    margin: "1vmax 2vmax",
                }}
                onClick={() => setLikesUser(!likesUser)}
                disabled={likes.length === 0 ? true : false}
            >
                <Typography>{likes.length} Likes</Typography>
            </button>

            <div className="postFooter">
                <Button onClick={handleLike}>
                    {liked ? (
                        <Favorite style={{ color: "red" }} />
                    ) : (
                        <FavoriteBorder />
                    )}
                </Button>

                <Button onClick={() => setCommentToggle(!commentToggle)}>
                    <ChatBubbleOutline />
                </Button>

                {isDelete ? (
                    <Button onClick={deletePostHandler}>
                        <DeleteOutline />
                    </Button>
                ) : null}
            </div>




      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>

          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />

            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        </div>
      </Dialog>





            <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
                <div className="DialogBox">
                    <Typography variant="h4">Liked By</Typography>
                    {likes.map((like) => (
                        <User
                            key={like._id}
                            userId={like.user}
                            name={like.user.name}
                            avatar={like.user.avatar.url}
                        />
                    ))}
                </div>
            </Dialog>

            <Dialog
                open={commentToggle}
                onClose={() => setCommentToggle(!commentToggle)}
            >
                <div className="DialogBox">
                    <Typography variant="h4">Comments</Typography>

                    <form className="commentForm" onSubmit={addCommentHandler}>
                        <input
                            type="text"
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            placeholder="Comment Here..."
                            required
                        />
                        <Button type="submit" variant="contained">
                            Add
                        </Button>
                    </form>

                    {comments.length > 0 ? (
                        comments.map((item) => (
                            <CommentCard
                                userId={item.user._id}
                                name={item.user.name}
                                avatar={item.user.avatar.url}
                                comment={item.comment}
                                commentId={item._id}
                                key={item._id}
                                postId={postId}
                            />
                        ))
                    ) : (
                        <Typography>No comments Yet</Typography>
                    )}
                </div>
            </Dialog>
        </div>
    );
};

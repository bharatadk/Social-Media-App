import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../../Actions/Post.js";
import { getFollowingUserPosts } from "../../Actions/User.js";

export const CommentCard = ({
    userId,
    name,
    avatar,
    comment,
    commentId,
    postId,
    isAccount,
}) => {
    const { user } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const deleteCommentHandle = () => {
        dispatch(deleteCommentOnPost(postId, commentId));

        if (isAccount) {
            // dispatch(getMyPosts());
        } else {
            dispatch(getFollowingUserPosts());
        }
    };

    return (
        <div className="commentUser">
            <Link to={`/user/${userId}`}>
                <img src={avatar} alt={name} />
                <Typography style={{ minWidth: "6vmax",margin:"0 5px" }}>{name}</Typography>
            </Link>
            <Typography>{comment}</Typography>

            {userId === user._id ? (
                <Button onClick={deleteCommentHandle}>
                    <Delete />
                </Button>
            ) : null}
        </div>
    );
};

import { Button, Typography } from "@mui/material";
import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost,getMyPosts } from "../../Actions/Post.js";
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

    const deleteCommentHandle = async () => {
        await dispatch(deleteCommentOnPost(postId, commentId));

        if (isAccount) {
            await dispatch(getMyPosts());
        } else {
            await dispatch(getFollowingUserPosts());
        }
    };


useEffect(()=>{

        async function fun(){
          if (isAccount) {
            await dispatch(getMyPosts());
        } else {
           await  dispatch(getFollowingUserPosts());
        }          
    }
    fun()

},[dispatch])

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

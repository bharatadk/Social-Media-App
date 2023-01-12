import "./Account.css"
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
	getMyPosts,
} from "../../Actions/Post.js"
import {
    logOut,
} from "../../Actions/User.js"
import {Post} from "../Post/Post.jsx";
import {User} from "../User/User.jsx";
import {Loader} from "../Loader/Loader.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link } from "react-router-dom"

export const Account = () => {

	const dispatch = useDispatch()
    const { user, loading: userLoading } = useSelector((state) => state.userReducer);

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

    const [followingToggle,setFollowingToggle] = useState(false)
    const [followersToggle,setFollowersToggle] = useState(false)

const deleteProfileHandler = () =>{

}

const  logoutHandler = async() => {
    await dispatch(logOut())
    toast.warn("Logged Out")
}

	useEffect(()=>{
		dispatch(getMyPosts())
	},[dispatch])




    useEffect(() => {
        if (postError) {
            toast.error(postError);
            dispatch({ type: "clearErrors" });
        }
        if (likedError) {
            toast.error(likedError);
            dispatch({ type: "clearErrors" });
        }
        if (likedMessage) {
            toast.success(likedMessage);
            dispatch({ type: "clearMessage" });
        }
    }, [likedError, likedMessage, postError, dispatch]);


return(  (loading || loadingUsers ) ? ( <Loader />  ) :
 (

    <div className="account">

  <div className="accountleft">
        {(posts && posts.length > 0) ? (
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
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">You have not made any post</Typography>
        )}
      </div>

          <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />
        <Typography variant="h5">{user.name}</Typography>
                <div>
          <button onClick={() => setFollowersToggle(true)}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user.followers.length}</Typography>
        </div>

        <div>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user.following.length}</Typography>
        </div>

        <div>
          <Typography>Posts</Typography>
          <Typography>{user.posts.length}</Typography>
        </div>

        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>

        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>

        <Button
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
          onClick={deleteProfileHandler}
          // disabled={deleteLoading}
        >
          Delete My Profile
        </Button>




        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(false)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>

            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no followers
              </Typography>
            )}
          </div>
        </Dialog>


     <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(false)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followings</Typography>

            {user && user.following.length > 0 ? (
              user.following.map((item) => (
                <User
                  key={item._id}
                  userId={item._id}
                  name={item.name}
                  avatar={item.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no following
              </Typography>
            )}
          </div>
        </Dialog>


        </div>
</div>)




)}
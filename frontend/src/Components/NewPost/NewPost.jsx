import "./NewPost.css";
import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../Actions/Post.js";
import { loadUser } from "../../Actions/User.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const NewPost =  () => {


	const [image,setImage] = useState(null)
	const [caption,setCaption] = useState("")
	const [formd,setFormd] = useState(null)

	const {loading, error, message} = useSelector((state)=> state.likeReducer)
	const dispatch = useDispatch()



const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, image));
    dispatch(loadUser());
  };



	useEffect(()=>{
		if(error){
			toast.error(error)
			dispatch({type:"clearErrors"})
		}

		if(message){
			toast.success(message)
			dispatch({type:"clearMessage"})
		}
	},[dispatch,error,message,toast])


  return (
    <div className="newPost" >
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h5">New Post</Typography>

        {image && <div className="imgContainer"><img src={image} alt="post" width="100%"/></div>}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <textarea
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => {setCaption(e.target.value)}} className="writeCaption"
        />
        <Button disabled={loading} type="submit" className="submitbutton">
          Post
        </Button>
      </form>
    </div>
  );
};
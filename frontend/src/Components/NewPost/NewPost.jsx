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



		

const cloudinary = async() => {
			const formData = new FormData()

		formData.append("file",image)
		formData.append("upload_preset","bco3re8y")
		formData.append("cloud_name","dqmyn40bs")


          try {
            const resp = await fetch("https://api.cloudinary.com/v1_1/dqmyn40bs/image/upload",{method : "post",body:formData})
            const res= await resp.json()
            // console.log(res.public_id)
             let {public_id,url} = res
             console.log(public_id,url)
             return [public_id,url]

    }catch(err){
        console.log(err)
    }
    
    
}

	const submitHandler = async(e) => {
		e.preventDefault()

		const [public_id,url] =await cloudinary()           
		await dispatch(createNewPost(caption,public_id,url))
		await dispatch(loadUser())
	}


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
        <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])} />
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
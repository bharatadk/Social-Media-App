import { Avatar, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Loader} from "../Loader/Loader.jsx";
import {Navigate} from "react-router-dom"
import "./UpdateProfile.css";
import { updateProfile,loadUser } from "../../Actions/User.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UpdateProfile = () => {

  const { loading,user, error } = useSelector((state) => state.userReducer);
   const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.likeReducer);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result)
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    await dispatch(loadUser());  
    <Navigate to ="/account"/>
  };

  useEffect(() => {
    if (error) {
      toast(error)
            dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error, toast]);


return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography>

        <Avatar
          src={avatarPrev}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="updateProfileInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="updateProfileInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={updateLoading} type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};
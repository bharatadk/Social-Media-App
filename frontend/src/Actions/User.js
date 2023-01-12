import axios from "axios";

// const API_URL = import.meta.env.VITE_API_UR;
import { API_URL } from "../config.js";
const axiosInstance = axios.create({
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LoginRequest",
        });

        const { data } = await axiosInstance.post(`${API_URL}/api/v1/login`, {
            email,
            password,
        });

        dispatch({
            type: "LoginSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error.response.data.message,
        });
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest",
        });

        const { data } = await axiosInstance.get(`${API_URL}/api/v1/myProfile`);

        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message,
        });
    }
};

export const getFollowingUserPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: "postOfFollowingRequest",
        });

        const { data } = await axiosInstance.get(`${API_URL}/api/v1/posts`);

        dispatch({
            type: "postOfFollowingSuccess",
            payload: data.posts,
        });
    } catch (error) {
        dispatch({
            type: "postOfFollowingFailure",
            payload: error.response.data.message,
        });
    }
};

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: "allUsersRequest",
        });

        const { data } = await axiosInstance.get(`${API_URL}/api/v1/users`);

        dispatch({
            type: "allUsersSuccess",
            payload: data.users,
        });
    } catch (error) {
        dispatch({
            type: "allUsersFailure",
            payload: error.response.data.message,
        });
    }
};


export const logOut = () => async (dispatch) => {
    try {
        dispatch({
            type: "LogoutUserRequest",
        });

    await axiosInstance.get(`${API_URL}/api/v1/logout`, {
        });

        dispatch({
            type: "LogoutUserSuccess",
        });
    } catch (error) {
        dispatch({
            type: "LogoutUserFailure",
            payload: error.response.data.message,
        });
    }
};
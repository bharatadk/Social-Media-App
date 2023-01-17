import axios from "axios";
import { API_URL } from "../config.js";

///////////

const axiosInstance = axios.create({
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

export const addCommentOnPost = (id, commentValue) => async (dispatch) => {
    try {
        dispatch({
            type: "addCommentRequest",
        });
        const necessary_request_data = {
            comment: commentValue,
        };
        const { data } = await axiosInstance.post(
            `${API_URL}/api/v1/post/comment/${id}`,
            necessary_request_data
        );
        dispatch({
            type: "addCommentSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "addCommentFailure",
            payload: error.response.data.message,
        });
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "likeRequest",
        });

        const { data } = await axiosInstance.get(
            `${API_URL}/api/v1/post/${id}`
        );
        dispatch({
            type: "likeSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "likeFailure",
            payload: error.response.data.message,
        });
    }
};

export const deleteCommentOnPost = (id, comment_Id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteCommentRequest",
        });

        const { data } = await axiosInstance.delete(
            `${API_URL}/api/v1/post/comment/${id}`,
            {
                data: { comment_Id },
            }
        );
        dispatch({
            type: "deleteCommentSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "deleteCommentFailure",
            payload: error.response.data.message,
        });
    }
};

export const getMyPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: "myPostsRequest",
        });

        const { data } = await axiosInstance.get(`${API_URL}/api/v1/my/posts`);
        dispatch({
            type: "myPostsSuccess",
            payload: data.posts,
        });
    } catch (error) {
        dispatch({
            type: "myPostsFailure",
            payload: error.response.data.message,
        });
    }
};

export const createNewPost = (caption, image) => async (dispatch) => {
    try {
        dispatch({
            type: "addPostRequest",
        });

        const necessary_request_data = {
            caption,
            image,
        };

        const { data } = await axiosInstance.post(
            `${API_URL}/api/v1/post/upload/`,
            necessary_request_data
        );

        dispatch({
            type: "addPostSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "addPostFailure",
            payload: error.response.data,
        });
    }
};

export const updatePost = (caption, id) => async (dispatch) => {
    try {
        dispatch({
            type: "updateCaptionRequest",
        });

        const necessary_request_data = {
            caption,
        };

        const { data } = await axiosInstance.put(
            `${API_URL}/api/v1/post/${id}`,
            necessary_request_data
        );

        dispatch({
            type: "updateCaptionSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "updateCaptionFailure",
            payload: error.response.data,
        });
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteCaptionRequest",
        });

        const necessary_request_data = {};

        const { data } = await axiosInstance.delete(
            `${API_URL}/api/v1/post/${id}`,
            necessary_request_data
        );

        dispatch({
            type: "deleteCaptionSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "deleteCaptionFailure",
            payload: error.response.data,
        });
    }
};

export const getUserPosts = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "userPostsRequest",
        });

        const { data } = await axiosInstance.get(
            `${API_URL}/api/v1/userposts/${id}`
        );
        dispatch({
            type: "userPostsSuccess",
            payload: data.posts,
        });
    } catch (error) {
        dispatch({
            type: "userPostsFailure",
            payload: error.response.data.message,
        });
    }
};

export const getUserProfile = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "userProfileRequest",
        });

        const { data } = await axiosInstance.get(
            `${API_URL}/api/v1/user/${id}`
        );
        dispatch({
            type: "userProfileSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "userProfileFailure",
            payload: error.response.data.message,
        });
    }
};

export const followAndUnfollowUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "followUserRequest",
        });

        const { data } = await axiosInstance.get(
            `${API_URL}/api/v1/follow/${id}`
        );
        dispatch({
            type: "followUserSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "followUserFailure",
            payload: error.response.data.message,
        });
    }
};

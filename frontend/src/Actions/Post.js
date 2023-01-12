import axios from "axios";
import { API_URL } from "../config.js";

///////////


const axiosInstance = axios.create({
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

export const addCommentOnPost = (id,commentValue) => async (dispatch) => {
    try {
        dispatch({
            type: "addCommentRequest",
        });
        console.log("id",id,commentValue)
        const necessary_request_data = {
            comment:commentValue,
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




export const deleteCommentOnPost = (id,comment_Id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentRequest",
    });

    const { data } = await axiosInstance.delete(`${API_URL}/api/v1/post/comment/${id}`, {
      data: { comment_Id },
    });
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




export const createNewPost = (caption,public_id,url) => async (dispatch) => {
    try {
        dispatch({
            type: "addPostRequest",
        });

  

            const necessary_request_data = {
                caption,public_id,url,
            }
        
        const { data } = await axiosInstance.post(
            `${API_URL}/api/v1/post/upload/`,
            necessary_request_data
        );
        console.log('data',data)
        dispatch({
            type: "addPostSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "addPostFailure",
            payload: error.response.data
        });
    }
};
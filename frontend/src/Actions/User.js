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

export const getAllUsers =
    (name = "") =>
    async (dispatch) => {
        try {
            dispatch({
                type: "allUsersRequest",
            });

            const { data } = await axiosInstance.get(
                `${API_URL}/api/v1/users?name=${name}`
            );

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

        await axiosInstance.get(`${API_URL}/api/v1/logout`, {});

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

export const registerUser =
    (name, email, password, avatar) => async (dispatch) => {
        try {
            dispatch({
                type: "RegisterRequest",
            });

            const { data } = await axios.post(`${API_URL}/api/v1/register`, {
                name,
                email,
                password,
                avatar,
            });

            dispatch({
                type: "RegisterSuccess",
                payload: data.user,
            });
        } catch (error) {
            dispatch({
                type: "RegisterFailure",
                payload: error.response.data.message,
            });
        }
    };

export const updateProfile = (name, email, avatar) => async (dispatch) => {
    try {
        dispatch({
            type: "UpdateProfileRequest",
        });

        const { data } = await axiosInstance.put(
            `${API_URL}/api/v1/update/profile`,
            { name, email, avatar }
        );

        dispatch({
            type: "UpdateProfileSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "UpdateProfileFailure",
            payload: error.response.data.message,
        });
    }
};

export const updatePassword =
    (oldPassword, newPassword) => async (dispatch) => {
        try {
            dispatch({
                type: "UpdatePasswordRequest",
            });

            const { data } = await axiosInstance.put(
                `${API_URL}/api/v1/update/password`,
                { oldPassword, newPassword }
            );

            dispatch({
                type: "UpdatePasswordSuccess",
                payload: data.message,
            });

            await axiosInstance.get(`${API_URL}/api/v1/logout`, {});
        } catch (error) {
            dispatch({
                type: "UpdatePasswordFailure",
                payload: error.response.data.message,
            });
        }
    };

export const deleteMyProfile =
    (oldPassword, newPassword) => async (dispatch) => {
        try {
            dispatch({
                type: "DeleteProfileRequest",
            });

            const { data } = await axiosInstance.delete(
                `${API_URL}/api/v1/delete/me`
            );

            dispatch({
                type: "DeleteProfileSuccess",
                payload: data.message,
            });
        } catch (error) {
            dispatch({
                type: "DeleteProfileFailure",
                payload: error.response.data.message,
            });
        }
    };

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: "ForgotPasswordRequest",
        });

        const { data } = await axios.post(
            `${API_URL}/api/v1/forgot/password`,
            {
                email,
                clientHost: "localhost:5173",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({
            type: "ForgotPasswordSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "ForgotPasswordFailure",
            payload: error.response.data.message,
        });
    }
};

export const resetPassword = (token, password) => async (dispatch) => {
    try {
        dispatch({
            type: "ResetPasswordRequest",
        });

        const { data } = await axios.put(
            `${API_URL}/api/v1/password/reset/${token}`,
            {
                password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({
            type: "ResetPasswordSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "ResetPasswordFailure",
            payload: error.response.data.message,
        });
    }
};

export const getUserPosts = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "UserPostsRequest",
        });
        const { data } = await axiosInstance.get(
            `${API_URL}/api/v1/userposts/${id}`
        );
        dispatch({
            type: "UserPostsSuccess",
            payload: data.posts,
        });
    } catch (error) {
        dispatch({
            type: "UserPostsFailure",
            payload: error.response.data.message,
        });
    }
};

export const getUserProfile = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "UserProfileRequest",
        });

        const { data } = await axiosInstance.get(
            `${API_URL}/api/v1/user/${id}`
        );
        dispatch({
            type: "UserProfileSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "UserProfileFailure",
            payload: error.response.data.message,
        });
    }
};

export const followAndUnfollowUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "FollowUserRequest",
        });

        const { data } = await axiosInstance.get(
            `${API_URL}/api/v1/follow/${id}`
        );

        dispatch({
            type: "FollowUserSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "FollowUserFailure",
            payload: error.response.data.message,
        });
    }
};

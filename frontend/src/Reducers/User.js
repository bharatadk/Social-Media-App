import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
};

const LoginRequest = createAction("LoginRequest");
const LoginSuccess = createAction("LoginSuccess");
const LoginFailure = createAction("LoginFailure");
const RegisterRequest = createAction("RegisterRequest");
const RegisterSuccess = createAction("RegisterSuccess");
const RegisterFailure = createAction("RegisterFailure");
const LoadUserRequest = createAction("LoadUserRequest");
const LoadUserSuccess = createAction("LoadUserSuccess");
const LoadUserFailure = createAction("LoadUserFailure");
const LogoutUserRequest = createAction("LogoutUserRequest");
const LogoutUserSuccess = createAction("LogoutUserSuccess");
const LogoutUserFailure = createAction("LogoutUserFailure");
const clearErrors = createAction("clearErrors");

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(LoginRequest, (state) => {
            state.loading = true;
        })
        .addCase(LoginSuccess, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(LoginFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(RegisterRequest, (state) => {
            state.loading = true;
        })
        .addCase(RegisterSuccess, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(RegisterFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(LoadUserRequest, (state) => {
            state.loading = true;
        })
        .addCase(LoadUserSuccess, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(LoadUserFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })



        .addCase(LogoutUserRequest, (state) => {
            state.loading = true;
        })
        .addCase(LogoutUserSuccess, (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(LogoutUserFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = true;
        })



        .addCase(clearErrors, (state) => {
            state.error = null;
        });
});

////////////////////////////////

const postOfFollowingRequest = createAction("postOfFollowingRequest");
const postOfFollowingSuccess = createAction("postOfFollowingSuccess");
const postOfFollowingFailure = createAction("postOfFollowingFailure");
// const clearErrors = createAction('clearErrors')

export const postOfFollowingReducer = createReducer(
    initialState,

    (builder) => {
        builder
            .addCase(postOfFollowingRequest, (state) => {
                state.loading = true;
            })

            .addCase(postOfFollowingSuccess, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })

            .addCase(postOfFollowingFailure, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(clearErrors, (state) => {
                state.error = null;
            });
    }
);

////////////////////////////////

const allUsersRequest = createAction("allUsersRequest");
const allUsersSuccess = createAction("allUsersSuccess");
const allUsersFailure = createAction("allUsersFailure");
// const clearErrors = createAction('clearErrors')

export const allUsersReducer = createReducer(
    initialState,

    (builder) => {
        builder
            .addCase(allUsersRequest, (state) => {
                state.loading = true;
            })

            .addCase(allUsersSuccess, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })

            .addCase(allUsersFailure, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(clearErrors, (state) => {
                state.error = null;
            });
    }
);
